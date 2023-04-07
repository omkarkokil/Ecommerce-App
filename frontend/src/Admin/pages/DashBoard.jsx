import React, { useContext } from "react";

import { Button, Stack, Typography } from "@mui/material";
import DataCard from "../Components/DataCard";
import PaymentChart from "../Components/PaymentChart";
import ApiContext from "../../Context/Api/ApiContext";

const DashBoard = () => {
  const { logOut } = useContext(ApiContext);
  return (
    <>
      <Stack
        my={"30px"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack mx={"10%"}>
          <Typography variant="h4" fontWeight={"bold"} color="initial">
            DashBoard
          </Typography>
          <Typography variant="h6" color="initial">
            Welcome admin
          </Typography>
        </Stack>
        <Stack mx={"10%"}>
          <Button variant="contained" color="error" onClick={logOut}>
            Log Out
          </Button>
        </Stack>
      </Stack>
      <DataCard />
      <PaymentChart />
    </>
  );
};

export default DashBoard;
