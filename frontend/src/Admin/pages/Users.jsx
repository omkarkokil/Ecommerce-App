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
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { blue } from "@mui/material/colors";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Delete, Edit } from "@mui/icons-material";
import StateContext from "../../Context/hooks/StateContext";
import FunctionContext from "../../Context/Function/FunctionContext";
import ApiContext from "../../Context/Api/ApiContext";

const Users = () => {
  const { AllUserData, userCount, activePage, setActivePage } =
    useContext(StateContext);
  const { totalPagesCalculator } = useContext(FunctionContext);
  const { DeleteUser } = useContext(ApiContext);

  const color = blue["A400"];
  const shade1 = blue[50];
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: color,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: shade1,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const count = totalPagesCalculator(
    userCount,
    process.env.REACT_APP_LIMIT
  ).map((pages) => pages).length;

  return (
    <div>
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

          <Stack justifyContent={"center"} alignItems={"center"}>
            <TableContainer component={Paper} sx={{ width: "70%" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ py: "10px" }}>
                      user id
                    </StyledTableCell>
                    <StyledTableCell align="center">User</StyledTableCell>
                    <StyledTableCell align="center">User email</StyledTableCell>
                    <StyledTableCell align="center">Role</StyledTableCell>
                    <StyledTableCell align="right">action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {AllUserData.map((ele, id) => {
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
                            <Typography
                              variant="body2"
                              color="initial"
                              sx={{ ml: "10px" }}
                            >
                              {ele.name}
                            </Typography>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {ele.email}
                        </StyledTableCell>
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
                            <IconButton
                              color="error"
                              onClick={() => DeleteUser(ele._id)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              sx={{ mt: "20px" }}
              variant="outlined"
              color="primary"
              page={activePage}
              onChange={(e, value) => setActivePage(value)}
              count={count}
            />
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default Users;
