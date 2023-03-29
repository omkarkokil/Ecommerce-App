import { Box, Stack } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { Email, Facebook, Google, Key, Person } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  InputAdornment,
  FormControl,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Stack height={"100vh"} alignItems="center" justifyContent={"center"}>
        <Typography variant="h5" textAlign={"center"} className="obitron">
          REGISTER
        </Typography>
        <Stack>
          <Stack direction={"row"}>
            <FormControl margin="dense">
              <TextField
                id=""
                margin="dense"
                sx={{ backgroundColor: "#fff", mr: "20px" }}
                placeholder="Enter your name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl margin="dense">
              <TextField
                id=""
                margin="dense"
                sx={{ backgroundColor: "#fff" }}
                placeholder="Enter your Email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Stack>
          <Stack direction={"row"}>
            <FormControl margin="dense">
              <TextField
                id=""
                size="medium"
                sx={{ backgroundColor: "#fff", mr: "20px" }}
                placeholder={"Enter your contact number"}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl margin="dense">
              <TextField
                id=""
                size="medium"
                sx={{ backgroundColor: "#fff" }}
                placeholder={"Enter your address"}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Stack>

          <Stack direction={"row"}>
            <FormControl margin="dense">
              <TextField
                id=""
                size="medium"
                sx={{ backgroundColor: "#fff", mr: "20px" }}
                placeholder={"Enter your Password"}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Key />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl margin="dense">
              <TextField
                id=""
                size="medium"
                sx={{ backgroundColor: "#fff" }}
                placeholder={"confirm your Password"}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Key />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Stack>

          <Typography variant="body2" my={"10px"}>
            Don't have an account? <Link to={"/login"}>Login</Link>
          </Typography>
          <FormControl margin="dense">
            <Button
              variant="contained"
              size="medium"
              sx={{ width: "50%" }}
              color="primary"
            >
              Register
            </Button>
          </FormControl>

          {/* <Box my={"10px"} width={"100%"}>
            <Divider />
          </Box>
          <Stack direction={"row"} justifyContent="space-around">
            <Button
              variant="contained"
              color="error"
              sx={{ mr: "20px", width: "45%" }}
              startIcon={<Google />}
            >
              Google
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "45%" }}
              startIcon={<Facebook />}
            >
              Facebook
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
