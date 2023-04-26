import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonLoader = () => {
  const arr = [];

  for (let i = 1; i <= 4; i++) {
    arr.push(i);
  }
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item md={10}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 3,
                width: 250,
                height: "max-content",
                marginTop: "30px",
              },
            }}
          >
            {arr.map((ele) => {
              return (
                <Box key={ele}>
                  <Skeleton variant="rectangular" width={210} height={175} />
                  <Skeleton
                    variant="rectangular"
                    sx={{ my: "10px" }}
                    width={210}
                    height={25}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ mb: "10px" }}
                    width={210}
                    height={20}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ mb: "10px" }}
                    width={210}
                    height={20}
                  />
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SkeletonLoader;
