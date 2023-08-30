import React, { useContext } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import StateContext from "../../../Context/hooks/StateContext";

const SkeletonLoader = ({ count }) => {
  const { theme } = useContext(StateContext);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexWrap: `${count === 4 ? "wrap" : "none"}`,
        }}
      >
        {Array.from({ length: count }, (_, id) => (
          <Box
            key={id}
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
        ))}
      </Box>
    </>
  );
};

export default SkeletonLoader;
