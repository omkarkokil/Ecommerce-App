import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import {
  Email,
  Facebook,
  Google,
  Key,
  Person,
  Person2,
} from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  InputAdornment,
  FormControl,
  Button,
  Typography,
  Divider,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import StateContext from "../../../../Context/hooks/StateContext";
import ApiContext from "../../../../Context/Api/ApiContext";
import FunctionContext from "../../../../Context/Function/FunctionContext";
import Navbar from "../../../../utils/Navbar/Navbar";
import LoginLoader from "../../../../utils/Loaders/LoginLoader";

const Register = () => {
  const { user, isLoading, UserImages, setUserImages } =
    useContext(StateContext);
  const { handleUser } = useContext(FunctionContext);
  const { RegisterHandler, postDetailes } = useContext(ApiContext);

  return (
    <>
      {isLoading ? <LoginLoader /> : ""}
      <Navbar />
      <Stack height={"100vh"} alignItems="center" justifyContent={"center"}>
        <Typography variant="h5" textAlign={"center"} className="obitron">
          REGISTER
        </Typography>
        <Stack>
          <FormControl margin="dense">
            <TextField
              id="name"
              margin="dense"
              sx={{ backgroundColor: "#fff", width: "400px", mr: "20px" }}
              placeholder="Enter your name"
              name="name"
              value={user.name}
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
              id="email"
              margin="dense"
              type={"email"}
              sx={{ backgroundColor: "#fff", width: "400px" }}
              placeholder="Enter your Email"
              name="email"
              value={user.email}
              onChange={handleUser}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl margin="dense">
            <TextField
              id="pass"
              size="medium"
              sx={{ backgroundColor: "#fff", width: "400px", mr: "20px" }}
              placeholder={"Enter your Password"}
              margin="dense"
              type={"password"}
              name="password"
              value={user.password}
              onChange={handleUser}
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
              id="cpass"
              size="medium"
              sx={{ backgroundColor: "#fff", width: "400px" }}
              placeholder={"confirm your Password"}
              margin="dense"
              type={"password"}
              name="Cpassword"
              value={user.Cpassword}
              onChange={handleUser}
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
              id="imageArr"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setUserImages(e.target.files);
              }}
              size="medium"
              sx={{ backgroundColor: "#fff", width: "400px", mr: "20px" }}
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person2 />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText sx={{ color: "red" }} id="component-helper-text">
              * Not Required
            </FormHelperText>
          </FormControl>

          <Typography variant="body2" my={"10px"}>
            Don't have an account? <Link to={"/login"}>Login</Link>
          </Typography>
          <Button
            variant="contained"
            size="medium"
            onClick={() => RegisterHandler(() => postDetailes(UserImages))}
            sx={{ width: "40%" }}
            color="primary"
          >
            Register
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
