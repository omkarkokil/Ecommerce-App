import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const Comment = () => {
  return (
    <>
      <Stack>
        <Stack alignItems={"center"}>
          <Stack
            sx={{
              width: "85%",
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
        </Stack>
      </Stack>
    </>
  );
};

export default Comment;
