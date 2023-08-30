import React, { useState } from "react";
import { Home, LocationCity, Phone, Pin } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import {
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import FunctionContext from "../../../../../../Context/Function/FunctionContext";
import StateContext from "../../../../../../Context/hooks/StateContext";

import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";

const Check1 = () => {
  const { orderData } = useContext(StateContext);
  const { handleNext, handleOrder } = useContext(FunctionContext);

  const States = State.getStatesOfCountry("IN");

  function isValidPinCode(str) {
    let regex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);
    if (str == null) {
      return "false";
    }
    if (regex.test(str) == true) {
      return true;
    } else {
      return false;
    }
  }

  const handleUserDetails = () => {
    const { address, mob, pincode, State } = orderData;

    if (!address || !mob || !pincode || !State) {
      toast.error("All fileds are mandatory");
      return false;
    }

    if (!isValidPinCode(pincode)) {
      toast.error("Pincode is incorrect");
      return false;
    }
    handleNext();
  };

  return (
    <>
      <Stack sx={{ mt: "40px" }}>
        <Typography
          textAlign={"center"}
          variant="h5"
          color="initial"
          className="obitron"
        >
          Enter your delivery address
        </Typography>

        <Stack justifyContent={"center"} alignItems="center" my={"20px"}>
          <FormControl margin="dense">
            <TextField
              id=""
              margin="dense"
              sx={{ backgroundColor: "#fff", width: "400px" }}
              placeholder="Enter Street address"
              name="address"
              value={orderData.address}
              onChange={handleOrder}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl margin="dense">
            <TextField
              id=""
              size="medium"
              sx={{ backgroundColor: "#fff", width: "400px" }}
              placeholder={"Enter your mobile number"}
              name="mob"
              value={orderData.mob}
              onChange={handleOrder}
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl margin="dense">
            <TextField
              id=""
              size="medium"
              sx={{ backgroundColor: "#fff", width: "400px" }}
              name="pincode"
              value={orderData.pincode}
              onChange={handleOrder}
              placeholder={"Enter your pincode"}
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Pin />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Box width="400px">
            <FormControl fullWidth margin="dense">
              <InputLabel id="countryState">Select State</InputLabel>
              <Select
                labelId="countryState"
                id="countryState"
                variant="outlined"
                name="State"
                value={orderData.State}
                label="Select State"
                onChange={handleOrder}
              >
                {States.map((ele, id) => {
                  return (
                    <MenuItem key={id} value={ele}>
                      {ele.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Box width="400px">
            <FormControl fullWidth margin="dense">
              <Button
                fullWidth
                variant="contained"
                onClick={handleUserDetails}
                size="medium"
                color="primary"
              >
                Continue
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Check1;
