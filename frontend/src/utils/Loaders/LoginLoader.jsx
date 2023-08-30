import { CircularProgress, Stack } from "@mui/material";
import React from "react";
const LoginLoader = () => {
  return (
    <>
      <Stack
        justifyContent={"center"}
        sx={{
          background: "#00000054",
          zIndex: "100000",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
        alignItems={"center"}
        height="100vh"
        width="100%"
      >
        <CircularProgress />
      </Stack>
    </>
  );
};

export default LoginLoader;
