import {
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  CircularProgress,
  Button,
  Modal,
} from "@mui/material";
import React, { useContext, useEffect } from "react";

import { styled } from "@mui/material/styles";
import { Delete, Edit, Person } from "@mui/icons-material";
import StateContext from "../../../Context/hooks/StateContext";
import FunctionContext from "../../../Context/Function/FunctionContext";
import ApiContext from "../../../Context/Api/ApiContext";
import DataTable from "../../../utils/Tables/DataTable";
import LoginLoader from "../../../utils/Loaders/LoginLoader";

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import axios from "axios";

const Users = () => {
  const { AllUserData, userCount, isLoading, setIsLoading, setAllUserData } =
    useContext(StateContext);
  const { totalPagesCalculator, StyledTableCell, StyledTableRow } =
    useContext(FunctionContext);
  const { DeleteUser } = useContext(ApiContext);
  const [open, setOpen] = React.useState({
    id: undefined,
    status: false,
  });

  const handleClickOpen = (ind) => {
    const id = ind;
    setOpen({
      ...open,
      id: id,
      status: true,
    });
  };

  const handleClose = (id) => {
    setOpen(false);
  };

  const handleAdmin = async (id, isAdmin) => {
    setIsLoading(true);
    try {
      const newAdmin = isAdmin !== 0 ? 0 : 1;
      const { data } = await axios.put(
        process.env.REACT_APP_UPDATE_USER_ROLE_URL,
        {
          id,
          isAdmin: newAdmin,
        },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      if (data.success) {
        setAllUserData((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === id) {
              return {
                ...user,
                isAdmin: newAdmin,
              };
            }
            return user;
          })
        );

        toast.success(data.msg);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    handleClose();
  };

  const NewDialogs = ({ onConfirm }) => (
    <Dialog
      open={open.status}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Change Role</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will change the role of user Are you sure to change the role of
          user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancle</Button>
        <Button onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  const count = totalPagesCalculator(userCount, 10).map(
    (pages) => pages
  ).length;

  const tablecol = [
    { name: "user id", pos: "left" },
    { name: "User", pos: "center" },
    { name: "User email", pos: "center" },
    { name: "Role", pos: "center" },
    { name: "action", pos: "right" },
  ];

  const tablerow = AllUserData.map((ele, id) => {
    return (
      <StyledTableRow key={id}>
        <StyledTableCell component="th" scope="row">
          {ele._id}
        </StyledTableCell>
        <StyledTableCell align="center">
          <Stack direction={"row"} width="max-content" alignItems={"center"}>
            <Avatar
              sx={{ height: "35px", width: "35px" }}
              src={ele.userPic}
            ></Avatar>
            <Typography variant="body2" color="initial" sx={{ ml: "10px" }}>
              {ele.name}
            </Typography>
          </Stack>
        </StyledTableCell>
        <StyledTableCell align="center">{ele.email}</StyledTableCell>
        <StyledTableCell align="center">
          {ele.isAdmin === 1 ? (
            <Typography variant="body2" color="error">
              admin
            </Typography>
          ) : (
            <Typography variant="body2" color="green">
              user
            </Typography>
          )}
        </StyledTableCell>

        <StyledTableCell align="right">
          <Stack justifyContent={"flex-end"} direction={"row"}>
            <Tooltip title="Confirm Role">
              <IconButton
                color="success"
                onClick={() => handleClickOpen(ele._id)}
              >
                <Person />
              </IconButton>
            </Tooltip>
            {open.id === ele._id && (
              <NewDialogs
                key={ele._id}
                className="new"
                id={ele._id}
                onConfirm={() => handleAdmin(ele._id, ele.isAdmin)}
              />
            )}
            <Tooltip title="Delete user">
              <IconButton color="error" onClick={() => DeleteUser(ele._id)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Stack>
        </StyledTableCell>
      </StyledTableRow>
    );
  });

  return (
    <div>
      {isLoading ? <LoginLoader /> : " "}
      <>
        <Stack
          my={{ md: "50px" }}
          alignItems={"center"}
          width={"100%"}
          mt={{ xs: "100px" }}
        >
          <Stack width={"90%"}>
            <Typography variant="h4" mb={"10px"}>
              All Users
            </Typography>

            <DataTable
              count={count}
              tablecol={tablecol}
              tablerow={tablerow}
              arr={AllUserData}
            />
          </Stack>
        </Stack>
      </>
    </div>
  );
};

export default Users;
