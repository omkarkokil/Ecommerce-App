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
import { Delete, Edit, Launch } from "@mui/icons-material";
import StateContext from "../../../Context/hooks/StateContext";
import FunctionContext from "../../../Context/Function/FunctionContext";
import ApiContext from "../../../Context/Api/ApiContext";
import DataTable from "../../../utils/Tables/DataTable";
import LoginLoader from "../../../utils/Loaders/LoginLoader";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";

const Orders = () => {
  const {
    allProducts,
    productCount,
    isLoading,
    activePage,
    allOrders,
    allOrdersCount,
  } = useContext(StateContext);
  const { totalPagesCalculator, StyledTableCell, StyledTableRow } =
    useContext(FunctionContext);

  const count = totalPagesCalculator(allOrdersCount, 10).map(
    (pages) => pages
  ).length;

  const tablecol = [
    { name: "Order id", pos: "left" },
    { name: "status", pos: "left" },
    { name: "Paystatus", pos: "center" },
    { name: "amount", pos: "center" },
    { name: "action", pos: "right" },
  ];

  const tablerow = allOrders.map((ele, id) => {
    return (
      <StyledTableRow key={id}>
        <StyledTableCell component="th" scope="row">
          {ele._id}
        </StyledTableCell>
        <StyledTableCell align="left">
          <Typography
            variant="body2"
            color={
              ele.orderStatus === "Processing" || ele.orderStatus === "Shipped"
                ? "red"
                : "green"
            }
          >
            {ele.orderStatus}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center">
          {" "}
          <Typography
            variant="body2"
            color={ele.PaymentType === "Paid" ? "green" : "red"}
          >
            {ele.PaymentType}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center">{ele.totalPrice}</StyledTableCell>

        <StyledTableCell align="right">
          <Tooltip title="Edit Product">
            <Link to={`/admin/getOrder/${ele._id}`}>
              <IconButton color="success">
                <Edit />
              </IconButton>
            </Link>
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
        <Stack
          my={{ md: "50px" }}
          alignItems={"center"}
          width={"100%"}
          mt={{ xs: "100px" }}
        >
          <Stack width={"90%"}>
            <Typography variant="h4" mb={"10px"}>
              Orders
            </Typography>

            <DataTable
              count={count}
              tablecol={tablecol}
              tablerow={tablerow}
              arr={allProducts}
            />
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default Orders;
