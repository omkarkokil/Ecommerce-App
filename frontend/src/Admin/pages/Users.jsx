import {
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  Avatar,
  Pagination,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect } from "react";

import { styled } from "@mui/material/styles";
import { Delete, Edit } from "@mui/icons-material";
import StateContext from "../../Context/hooks/StateContext";
import FunctionContext from "../../Context/Function/FunctionContext";
import ApiContext from "../../Context/Api/ApiContext";
import DataTable from "../../utils/DataTable";
import LoginLoader from "../../utils/LoginLoader";

const Users = () => {
  const { AllUserData, userCount, isLoading } = useContext(StateContext);
  const { totalPagesCalculator, StyledTableCell, StyledTableRow } =
    useContext(FunctionContext);
  const { DeleteUser, AllUsersData, activePage } = useContext(ApiContext);

  const count = totalPagesCalculator(
    userCount,
    process.env.REACT_APP_LIMIT
  ).map((pages) => pages).length;

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
          <Stack direction={"row"} alignItems={"center"}>
            <Avatar
              sx={{ height: "35px", width: "35px" }}
              src={ele.userPic}
            ></Avatar>
            <Typography variant="body2" color="initial" sx={{ ml: "10px" }}>
              {ele.email}
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
          <Tooltip title="Edit Product">
            <IconButton color="success">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete user">
            <IconButton color="error" onClick={() => DeleteUser(ele._id)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </StyledTableCell>
      </StyledTableRow>
    );
  });

  return (
    <div>
      {isLoading ? (
        <Stack
          sx={{
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Stack sx={{ my: "7%" }}>
          <Stack>
            <Stack alignItems={"center"}>
              <Typography variant="h5" className="obitron">
                USERS
              </Typography>
              <Box width={"15%"} my="10px">
                <Divider />
              </Box>
            </Stack>
          </Stack>

          <DataTable
            count={count}
            tablecol={tablecol}
            tablerow={tablerow}
            arr={AllUserData}
          />
        </Stack>
      )}
    </div>
  );
};

export default Users;
