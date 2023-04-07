import { Box, IconButton, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Carosoul from "../components/Home/Carosoul";
import Trends from "../components/Home/Trends";

import GridLayout from "../components/Home/GridLayout";
import { Link } from "react-router-dom";
import Navbar from "../utils/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Carosoul />
      <Box margin={"20px"}>
        <Typography variant="h4" fontWeight={"bold"} color="initial">
          Trending Products
        </Typography>
      </Box>
      <Stack
        position={"relative"}
        background={"#f1f1f1"}
        height="max-content"
        mb={"20px"}
      >
        <Trends />
      </Stack>

      <Box margin={"20px"} mt={"50px"}>
        <Typography variant="h4" fontWeight={"bold"} color="initial">
          Featured Products
        </Typography>
      </Box>
      <Stack my="20">
        <GridLayout />
      </Stack>
      <Stack my={2} justifyContent={"center"} alignItems={"center"}>
        <Link to={"/products"}>
          <Button variant="contained" color="primary">
            See All products
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default Home;
