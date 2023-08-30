import { Box, Stack } from "@mui/system";
import React from "react";

const MainLoader = () => {
  return (
    <>
      <Stack justifyContent={"center"} alignItems="center" height={"100vh"}>
        <div className="preloaderBg" id="preloader">
          <div className="preloader"></div>
          <div className="preloader2"></div>
        </div>
      </Stack>
    </>
  );
};

export default MainLoader;
