import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Divider, FormControl, InputAdornment, TextField } from "@mui/material";
import { CreditCard, DateRange, Key } from "@mui/icons-material";
import FunctionContext from "../../../../Context/Function/FunctionContext";
import ApiContext from "../../../../Context/Api/ApiContext";

const Check3 = () => {
  const { handleNext } = React.useContext(FunctionContext);
  const { makeOrder, OnlinePayment } = React.useContext(ApiContext);
  return (
    <>
      <Stack sx={{ mt: "40px" }}>
        <Typography
          textAlign={"center"}
          variant="h5"
          color="initial"
          className="obitron"
        >
          Enter your card details
        </Typography>

        <Stack justifyContent={"center"} alignItems="center">
          <FormControl margin="dense">
            <TextField
              id=""
              margin="dense"
              sx={{ backgroundColor: "#fff", width: "400px" }}
              placeholder="Enter Card number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCard />
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
              placeholder={"Enter MM/YY"}
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRange />
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
              placeholder={"Enter your CVC"}
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

          <Box width="400px">
            <FormControl fullWidth margin="dense">
              <Button
                fullWidth
                variant="contained"
                size="medium"
                onClick={OnlinePayment}
                color="primary"
              >
                Pay online &#8377;54000
              </Button>
            </FormControl>
            <Divider sx={{ my: "10px" }} />
            <FormControl fullWidth margin="dense">
              <Button
                fullWidth
                variant="contained"
                size="medium"
                color="success"
                onClick={makeOrder}
              >
                cash on delivery
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Check3;
