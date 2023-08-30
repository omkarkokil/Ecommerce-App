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
import StateContext from "../../../../Context/hooks/StateContext";
import FunctionContext from "../../../../Context/Function/FunctionContext";
import ApiContext from "../../../../Context/Api/ApiContext";
import DataTable from "../../../../utils/Tables/DataTable";
import LoginLoader from "../../../../utils/Loaders/LoginLoader";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";

const ViewProducts = () => {
  const { allProducts, productCount, isLoading, activePage } =
    useContext(StateContext);
  const { totalPagesCalculator, StyledTableCell, StyledTableRow } =
    useContext(FunctionContext);
  const { DeleteProduct, getProducts } = useContext(ApiContext);

  useEffect(() => {
    getProducts();
  }, [activePage]);

  const count = totalPagesCalculator(productCount, 10).map(
    (pages) => pages
  ).length;

  const tablecol = [
    { name: "user id", pos: "left" },
    { name: "name", pos: "left" },
    { name: "price", pos: "center" },
    { name: "stock", pos: "center" },
    { name: "action", pos: "right" },
  ];

  const tablerow = allProducts.map((ele, id) => {
    return (
      <StyledTableRow key={id}>
        <StyledTableCell component="th" scope="row">
          {ele._id}
        </StyledTableCell>
        <StyledTableCell align="left">
          <Typography variant="body2" width={"max-content"} color="initial">
            {ele.name.slice(0, 50)}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center">{ele.price}</StyledTableCell>
        <StyledTableCell align="center">{ele.stock}</StyledTableCell>

        <StyledTableCell align="right">
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <Tooltip title="Edit Product">
              <Link to={`/admin/editProduct/${ele._id}`}>
                <IconButton color="success">
                  <Edit />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Delete user">
              <IconButton color="error" onClick={() => DeleteProduct(ele._id)}>
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
            <Typography mb={"10px"} variant="h4">
              All Products
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

export default ViewProducts;
