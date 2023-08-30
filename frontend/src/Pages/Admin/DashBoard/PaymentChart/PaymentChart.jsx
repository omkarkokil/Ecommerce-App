import React, { useContext, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2";
import { Avatar, Stack, Typography } from "@mui/material";
import StateContext from "../../../../Context/hooks/StateContext";

const PaymentChart = () => {
  const { totalCategoryBuy, Inventory, productCount } =
    useContext(StateContext);

  const allTotalCategoryBuy = totalCategoryBuy.reduce((a, i) => {
    return a + i.count;
  }, 0);

  const allData = [
    "Top",
    "attire",
    "Appliances",
    "electronics",
    "Bottom",
    "Laptop & tech",
  ];
  const modifiedCategory = allData.map((category) => {
    const exists = totalCategoryBuy.find((item) => item._id === category);
    const count = exists ? exists.count : 0;
    return { category, count };
  });

  const modifiedInventory =
    Inventory &&
    allData.map((category) => {
      const exists = Inventory.find((item) => item._id === category);
      const count = exists ? exists.totalProducts : 0;
      return { category, count };
    });

  const data = {
    labels: allData,
    datasets: [
      {
        label: "Purchases based on category",
        data: modifiedCategory.map((ele) => {
          return ele.count;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(0 ,159 ,253, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(0 ,159 ,253)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
        ],

        borderWidth: 1,
      },
    ],
  };

  const Inventorydata = {
    labels: allData,
    datasets: [
      {
        label: "Total products ",
        data:
          Inventory &&
          modifiedInventory.map((ele) => {
            return ele.count;
          }),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(0 ,159 ,253, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 206, 86)",
          "rgba(54, 162, 235)",
          "rgba(255, 99, 132)",
          "rgba(0 ,159 ,253)",
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
        mt={"50px"}
        ml={{ md: "50px" }}
        alignItems={"center"}
        direction={{ md: "row", xs: "column" }}
      >
        <Stack
          width={{ md: "45%", xs: "90%" }}
          mr={{ md: "20px", xs: 0 }}
          mb={{ xs: "20px", md: 0 }}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h5" mb={"10px"} color="#CB218E">
              Purchase{" "}
            </Typography>
            <Avatar
              variant="rounded"
              sx={{
                mx: "5px",
                width: 24,
                height: 24,
                backgroundColor: "#CB218E",
              }}
            >
              <Typography variant="body1" color="#fff">
                {allTotalCategoryBuy}
              </Typography>
            </Avatar>
          </Stack>
          <Bar
            data={data}
            style={{
              padding: "15px",
              boxShadow: "0 0 2px #666",
              backgroundColor: "ghostwhite",
            }}
          />
        </Stack>
        <Stack
          width={{ md: "45%", xs: "90%" }}
          mr={{ md: "20px", xs: 0 }}
          mb={{ xs: "20px", md: 0 }}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h5" mb={"10px"} color="#20BF55">
              Inventory{" "}
            </Typography>
            <Avatar
              variant="rounded"
              sx={{
                mx: "5px",
                width: 24,
                height: 24,
                backgroundColor: "#20BF55",
              }}
            >
              <Typography variant="body1" color="#fff">
                {productCount}
              </Typography>
            </Avatar>
          </Stack>
          <Bar
            data={Inventorydata}
            style={{
              backgroundColor: "ghostwhite",
              padding: "15px",
              boxShadow: "0 0 2px #666",
            }}
          />
        </Stack>
        {/* <Stack width={"30%"} justifyContent={"center"} alignItems={"center"}>
            <Doughnut data={dought} />
          </Stack> */}
      </Stack>
    </>
  );
};

export default PaymentChart;
