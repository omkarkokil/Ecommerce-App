import React, { useContext, useEffect } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import DataCard from "./DataCard/DataCard";
import PaymentChart from "./PaymentChart/PaymentChart";
import ApiContext from "../../../Context/Api/ApiContext";
import FunctionContext from "../../../Context/Function/FunctionContext";
import TopPurchaseTable from "./TopPurchase/TopPurchaseTable";

const DashBoard = () => {
  const { logOut, getProducts } = useContext(ApiContext);

  const { shade1, color } = useContext(FunctionContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Stack
        ml={{ md: "50px" }}
        alignItems={{ xs: "center", md: "flex-start" }}
        mt={"20px"}
      >
        <Stack
          width={{ xs: "90%", md: "95%" }}
          my={{ sm: "30px", xs: "0" }}
          mt={{ xs: "80px" }}
          mb={{ xs: "10px" }}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Typography variant="h4" fontWeight={"bold"} color={color}>
              DashBoard
            </Typography>
            <Typography variant="h6" color="initial">
              Welcome admin
            </Typography>
          </Box>
          <Button variant="contained" color="error" onClick={logOut}>
            Log Out
          </Button>
        </Stack>
      </Stack>
      <DataCard />
      <PaymentChart />
      <TopPurchaseTable />
    </>
  );
};

export default DashBoard;
