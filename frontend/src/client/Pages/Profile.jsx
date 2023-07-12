import React, { useContext } from "react";
import StateContext from "../../Context/hooks/StateContext";
import Navbar from "../../utils/Navbar";
import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import FunctionContext from "../../Context/Function/FunctionContext";
import UpdateModal from "../components/Profile/UpdateModal";

const Profile = () => {
  const { currentUser, theme } = useContext(StateContext);
  const { handleCloseModal, handleOpenModal, openModal } =
    React.useContext(FunctionContext);

  const mydate = new Date(currentUser.createdAt);
  const createdAt = mydate.toDateString();

  return (
    <>
      <Navbar />
      <UpdateModal />

      <Stack
        direction={{ md: "row", xs: "column" }}
        mt={"5%"}
        // sx={{
        //   [theme.breakpoints.up("xs")]: {
        //     alignItems: "center",
        //   },
        //   [theme.breakpoints.up("md")]: {
        //     alignItems: "flex-start",
        //   },
        // }}
      >
        <Stack alignItems={"center"} justifyContent={"center"} width={"50%"}>
          <Typography variant="h4">My Profile</Typography>
          <Avatar
            sx={{
              height: "250px",
              width: "250px",
              my: "50px",
              transition: ".3s all",
              cursor: "pointer",
              ":hover": {
                scale: "1.1",
              },
            }}
            src={currentUser.userpic}
          />

          <Button
            variant="contained"
            sx={{ py: "5px", px: "100px" }}
            color="primary"
            onClick={handleOpenModal}
          >
            Edit Profile
          </Button>
        </Stack>
        <Stack gap={6} mt={"70px"} justifyContent={"center"} width={"50%"}>
          <Stack gap={5}>
            <Box>
              <Typography variant="h6" color="gray">
                Username:
              </Typography>
              <Typography variant="body1" color="initial">
                {currentUser.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="gray">
                Email Address :
              </Typography>
              <Typography variant="body1" color="initial">
                {currentUser.email}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="gray">
                Joined on :
              </Typography>
              <Typography variant="body1" color="initial">
                {createdAt}
              </Typography>
            </Box>
          </Stack>

          <Stack gap={5} width={"max-content"}>
            <Link to={"/orders"}>
              <Button
                variant="contained"
                sx={{ py: "5px", px: "100px" }}
                color="warning"
              >
                My Orders
              </Button>
            </Link>
            <Button
              variant="contained"
              sx={{ py: "5px", px: "70px" }}
              color="error"
            >
              Change Password
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Profile;
