import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import StateContext from "../../Context/hooks/StateContext";

const TopPurchaseTable = () => {
  const { topPurchaseProduct } = useContext(StateContext);

  console.log(topPurchaseProduct);

  const Purchases = topPurchaseProduct.map((ele, id) => {
    return (
      <TableRow
        key={id}
        sx={{ backgroundColor: id % 2 === 0 ? "#e3f2fd" : "#fff" }}
      >
        <TableCell>{ele._id}</TableCell>
        <TableCell>
          <Typography width={"max-content"} variant="body2" color="initial">
            {ele.productInfo.name.slice(0, 50)}
          </Typography>
        </TableCell>
        <TableCell>{ele.productInfo.price}</TableCell>
        <TableCell>{ele.totalPurchases}</TableCell>
      </TableRow>
    );
  });

  return (
    <Stack
      ml={{ md: "50px" }}
      alignItems={{ xs: "center", md: "flex-start" }}
      mt={"20px"}
    >
      <Stack my={"20px"} width={"90%"}>
        <Typography variant="h5" mb={"10px"} color="#6617CB">
          Most order product
        </Typography>
        <TableContainer sx={{ width: "100%" }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead
              sx={{ background: "linear-gradient(#009FFD , #2A2A72)" }}
            >
              <TableRow>
                <TableCell sx={{ color: "#fff" }}> id</TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  name
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  price
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  ordercount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{Purchases}</TableBody>
          </Table>{" "}
        </TableContainer>
      </Stack>
    </Stack>
  );
};

export default TopPurchaseTable;
