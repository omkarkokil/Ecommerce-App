import { Box, Stack } from "@mui/system";
import React from "react";
import TextField from "@mui/material/TextField";
import { Facebook, Google, Key, Person } from "@mui/icons-material";
import {
  InputAdornment,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Stack height={"100vh"} alignItems="center" justifyContent={"center"}>
        <Stack>
          <Typography variant="h5" textAlign={"center"} className="obitron">
            LOGIN
          </Typography>
          <FormControl margin="dense">
            <TextField
              id=""
              type={"email"}
              margin="dense"
              sx={{ backgroundColor: "#fff", width: "400px" }}
              placeholder="Email"
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
              size="medium"
              type={"password"}
              sx={{ backgroundColor: "#fff", width: "400px" }}
              placeholder={"Password"}
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
          <Typography variant="body2" my={"10px"}>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </Typography>
          <FormControl margin="dense" width="50%">
            <Button variant="contained" size="medium" color="info">
              Login
            </Button>
          </FormControl>

          <Box my={"10px"} width={"100%"}>
            <Divider />
          </Box>
          <Stack direction={"row"} width="400px" justifyContent="space-around">
            <Button
              variant="contained"
              color="error"
              sx={{ mr: "20px", width: "200px" }}
              startIcon={<Google />}
            >
              Google
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "200px" }}
              startIcon={<Facebook />}
            >
              Facebook
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
