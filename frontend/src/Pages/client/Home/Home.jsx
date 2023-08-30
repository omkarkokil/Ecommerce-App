import {
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
  Skeleton,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { Suspense, useContext, useEffect } from "react";
import Trends from "./Trends/Trends";
import { Link } from "react-router-dom";
import Navbar from "../../../utils/Navbar/Navbar";
import ApiContext from "../../../Context/Api/ApiContext";
import SkeletonLoader from "../../../utils/Loaders/Skeletons/SkeletonLoader";
import StateContext from "../../../Context/hooks/StateContext";
import GridLayout from "./Product/GridLayout";
import LoginLoader from "../../../utils/Loaders/LoginLoader";

const Carosoul = React.lazy(() => import("./Carosoul/Carosoul"));

const Home = () => {
  const { getProducts } = useContext(ApiContext);
  const { isLoading, allProducts, theme } = useContext(StateContext);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Navbar />
      {/* {allProducts.length <= 0 ? (
        <LoginLoader />
      ) : ( */}
      <>
        <Stack
          sx={{
            [theme.breakpoints.up("xs")]: {
              height: "40vh",
            },
            [theme.breakpoints.up("sm")]: {
              height: "50vh",
            },
            [theme.breakpoints.up("md")]: {
              height: "65vh",
            },
          }}
        >
          <Suspense
            fallback={<Skeleton variant="rect" width="100%" height="100%" />}
          >
            <Carosoul />
          </Suspense>
        </Stack>
        <Stack justifyContent={"center"} alignItems={"center"} mt={"20px"}>
          <Typography
            variant="body1"
            sx={{
              [theme.breakpoints.up("xs")]: {
                fontSize: ".95rem",
              },

              [theme.breakpoints.up("md")]: {
                fontSize: "1rem",
              },
            }}
            fontWeight={"bold"}
            color="primary"
          >
            Recommended
          </Typography>
          <Typography
            variant="h4"
            sx={{
              [theme.breakpoints.up("xs")]: {
                fontSize: "1.8em",
              },

              [theme.breakpoints.up("md")]: {
                fontSize: "2.125rem",
              },
            }}
            fontWeight={"bold"}
            color="initial"
          >
            Trending products
          </Typography>
          <Box width={"20%"} mt={"5px"}>
            <Divider />
          </Box>
        </Stack>

        <Stack
          position={"relative"}
          background={"#f1f1f1"}
          height="max-content"
          mb={"20px"}
        >
          <Trends />
        </Stack>

        <Stack justifyContent={"center"} alignItems={"center"} my={"20px"}>
          <Typography
            variant="body1"
            sx={{
              [theme.breakpoints.up("xs")]: {
                fontSize: ".95rem",
              },

              [theme.breakpoints.up("md")]: {
                fontSize: "1rem",
              },
            }}
            fontWeight={"bold"}
            color="primary"
          >
            Latest
          </Typography>
          <Typography
            variant="h4"
            sx={{
              [theme.breakpoints.up("xs")]: {
                fontSize: "1.8em",
              },

              [theme.breakpoints.up("md")]: {
                fontSize: "2.125rem",
              },
            }}
            fontWeight={"bold"}
            color="initial"
          >
            Products
          </Typography>
          <Box width={"10%"} mt={"5px"}>
            <Divider />
          </Box>
        </Stack>
        <Stack my="20">
          <GridLayout />
        </Stack>
      </>
      {/* )} */}
    </>
  );
};

export default Home;
