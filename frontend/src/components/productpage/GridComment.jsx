import { Divider, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";

import React from "react";
import Comment from "./Comment";

const GridComment = () => {
  return (
    <>
      <Stack
        sx={{
          my: "10px",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" className="obitron">
          REVIEWS
        </Typography>
        <Box width={"20%"} my="10px">
          <Divider />
        </Box>
      </Stack>
      <Stack>
        <Grid
          container
          width={"80%"}
          justifyContent={"center"}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item md={10}>
            <Box
              sx={{
                display: "flex",
                // justifyContent: "center",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 3,
                  width: 250,
                  height: "max-content",
                  marginTop: "30px",
                },
              }}
            >
              <Comment />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default GridComment;
