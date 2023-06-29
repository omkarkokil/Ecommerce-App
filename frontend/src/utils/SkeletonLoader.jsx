import React, { useContext } from "react";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import StateContext from "../Context/hooks/StateContext";

const SkeletonLoader = () => {
  const { theme } = useContext(StateContext);

  return (
    <Box
      sx={{
        margin: "20px",
        [theme.breakpoints.up("xs")]: {
          width: "200px",
        },

        [theme.breakpoints.up("md")]: {
          width: "250px",
        },
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          [theme.breakpoints.up("xs")]: {
            height: "150px",
          },
          [theme.breakpoints.up("sm")]: {
            height: "175px",
          },

          [theme.breakpoints.up("md")]: {
            height: "200px",
          },
        }}
      />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width="90%" sx={{ mt: "10px" }} height={"30px"} />
        <Skeleton height={"20px"} width="60%" />
        <Skeleton height={"20px"} sx={{ mb: "10px" }} width="30%" />
      </Box>
    </Box>
  );
};

export default SkeletonLoader;
