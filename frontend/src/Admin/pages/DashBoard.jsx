import React from "react";

import { Stack, Typography } from "@mui/material";
import DataCard from "../Components/DataCard";
import PaymentChart from "../Components/PaymentChart";

const DashBoard = () => {
  return (
    <>
      <Stack ml={"100px"} my={"30px"}>
        <Typography variant="h4" fontWeight={"bold"} color="initial">
          DashBoard
        </Typography>
        <Typography variant="h6" color="initial">
          Welcome admin
        </Typography>
      </Stack>
      <DataCard />
      <PaymentChart />
    </>
  );
};

export default DashBoard;
