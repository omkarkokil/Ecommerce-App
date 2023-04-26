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
  Button,
  Avatar,
} from "@mui/material";
import React from "react";
import { blue } from "@mui/material/colors";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Delete, Edit, Login, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Navbar from "../../utils/Navbar";

const ClientOrders = () => {
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
  const arr = [
    {
      Pid: "1234567",
      name: "Latop",
      qty: "1",
      amount: "50000",
      status: 1,
    },
    {
      Pid: "451655545",
      name: "Iphone 11 mini",
      qty: "2",
      amount: "60000",
      status: 0,
    },
    {
      Pid: "5452158",
      name: "Red jacket for men",
      qty: "3",
      amount: "1000",
      status: 1,
    },
  ];
  return (
    <div>
      <Navbar />
      <Stack sx={{ my: "7%" }}>
        {arr.length <= 0 ? (
          <Stack
            height={"60vh"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar sx={{ background: shade1, height: "5em", width: "5em" }}>
              <Store
                sx={{
                  fontSize: "4em",
                  color: color,
                }}
              />
            </Avatar>
            <Typography
              variant="h4"
              fontSize={"2.5em"}
              sx={{ my: "20px" }}
              color="initial"
            >
              You have not yet had any orders
            </Typography>
            <Link to="/products">
              <Button variant="contained" color="primary">
                View Products
              </Button>
            </Link>
          </Stack>
        ) : (
          <Stack>
            <Stack alignItems={"center"}>
              <Typography variant="h6" className="obitron">
                YOUR ORDER
              </Typography>
              <Box width={"20%"} my="10px">
                <Divider />
              </Box>
            </Stack>

            <Stack justifyContent={"center"} alignItems={"center"}>
              <TableContainer component={Paper} sx={{ width: "70%" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ py: "10px" }}>
                        Order id
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Product name
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Product qty
                      </StyledTableCell>
                      <StyledTableCell align="center">amount</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="right">action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {arr.map((ele, id) => {
                      return (
                        <StyledTableRow key={id}>
                          <StyledTableCell component="th" scope="row">
                            {ele.Pid}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {ele.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {ele.qty}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {ele.amount}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {ele.status === 1 ? (
                              <Typography variant="body1" color="green">
                                Delivered
                              </Typography>
                            ) : (
                              <Typography variant="body1" color="error">
                                In Process
                              </Typography>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Tooltip title="Show product">
                              <IconButton color="primary">
                                <Login />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        )}
      </Stack>
    </div>
  );
};

export default ClientOrders;
