import React from "react";
import Chart from "chart.js/auto";
import { Doughnut, Line, PolarArea } from "react-chartjs-2";
import { Stack, Typography } from "@mui/material";

const PaymentChart = () => {
  const data = {
    labels: [
      "Top",
      "Attire",
      "Appliances",
      "electronics",
      "Bottom",
      "Laptop & Tech",
    ],
    datasets: [
      {
        label: "Category",
        data: [12, 19, 5, 17, 2, 12],
        backgroundColor: [
          "#d81b60",
          "#8e24aa",
          "#5e35b1",
          "#1e88e5",
          "#00897b",
          "#ffb300",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dought = {
    labels: ["In Stocks", "Out of Stocks"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        backgroundColor: ["#d81b60", "#8e24aa"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Stack
        width={"100%"}
        my={"75px"}
        justifyContent={"space-around"}
        direction={"row"}
      >
        <Stack width={"30%"}>
          <PolarArea data={data} />
        </Stack>
        <Stack width={"30%"} justifyContent={"center"} alignItems={"center"}>
          <Doughnut data={dought} />
        </Stack>
      </Stack>
    </>
  );
};

export default PaymentChart;
