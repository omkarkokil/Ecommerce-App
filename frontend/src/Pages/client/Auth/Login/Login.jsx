import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  Facebook,
  Google,
  Key,
  LoginOutlined,
  Person,
} from "@mui/icons-material";
import {
  InputAdornment,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import StateContext from "../../../../Context/hooks/StateContext";
import FunctionContext from "../../../../Context/Function/FunctionContext";
import ApiContext from "../../../../Context/Api/ApiContext";
import Navbar from "../../../../utils/Navbar/Navbar";
import LoginLoader from "../../../../utils/Loaders/LoginLoader";

const Login = () => {
  const { user, setUser, isLoading, isLogin } = useContext(StateContext);
  const { handleUser } = useContext(FunctionContext);
  const { loginhandler, googleLogin } = useContext(ApiContext);

  return (
    <>
      {isLoading ? <LoginLoader /> : ""}
      <Navbar />
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
              name="email"
              value={user.email}
              onChange={handleUser}
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
              name="password"
              value={user.password}
              onChange={handleUser}
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
            <Button
              variant="contained"
              size="medium"
              startIcon={<LoginOutlined />}
              onClick={loginhandler}
              color="info"
            >
              Login
            </Button>
          </FormControl>

          <FormControl width="50%" margin="dense">
            <Button
              variant="contained"
              size="medium"
              startIcon={<Person />}
              onClick={() => {
                setUser((pre) => {
                  return {
                    ...pre,
                    email: "admin@gmail.com",
                    password: "123",
                  };
                });
              }}
              color="success"
            >
              Demo Login
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
              onClick={googleLogin}
            >
              Google
            </Button>
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse.credential);
                let decode = jwt_decode(credentialResponse.credential);
                // console.log(decode);
                setUser({
                  name: decode.name,
                  email: decode.email,
                  userPic: decode.picture,
                });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}

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
