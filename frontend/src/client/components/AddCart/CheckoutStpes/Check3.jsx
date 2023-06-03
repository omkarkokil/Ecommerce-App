import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Divider, FormControl, InputAdornment, TextField } from "@mui/material";
import { CreditCard, DateRange, Key } from "@mui/icons-material";
import FunctionContext from "../../../../Context/Function/FunctionContext";
import ApiContext from "../../../../Context/Api/ApiContext";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Check3 = () => {
  const { handleNext } = React.useContext(FunctionContext);
  const { makeOrder, OnlinePayment } = React.useContext(ApiContext);
  return (
    <>
      <Stack sx={{ mt: "40px" }}>
        <Typography variant="h5" textAlign={"center"} fontSize="1.7em">
          Pay online by your favorite online apps
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          my={"25px"}
        >
          <img
            src="https://www.freefx.com/img/Funding%20Icons/VisaMastercard.png"
            alt="none"
            style={{
              height: "40px",
            }}
          />
          <img
            src="https://i0.wp.com/zeevector.com/wp-content/uploads/Bhim-Upi-Logo-PNG.png?resize=600%2C80&is-pending-load=1#038;ssl=1"
            alt="none"
            style={{
              height: "30px",
            }}
          />
        </Stack>

        <Stack justifyContent={"center"} alignItems="center">
          <Box width="400px">
            <FormControl fullWidth margin="dense">
              <Button
                fullWidth
                variant="contained"
                size="medium"
                onClick={OnlinePayment}
                color="primary"
              >
                Pay online
              </Button>
            </FormControl>
            {/* <Divider sx={{ my: "10px" }} /> */}
            <Stack direction="row" justifyContent="center" alignItems="center">
              <img
                src="https://th.bing.com/th/id/R.d8fccff92f21dced7b8922b5787685bc?rik=9bD4937qQijWRw&riu=http%3a%2f%2fwww.unisilvertime.com%2fassets%2funisilvertime%2fimages%2fcod_1.png&ehk=By5sNlEvC9VFIH2XBUbmKu4PurQjI%2bkV%2b30HcEfjxzM%3d&risl=&pid=ImgRaw&r=0"
                alt="none"
                style={{
                  height: "100px",
                }}
              />
              <img
                src="https://cdn2.iconfinder.com/data/icons/shopping-e-commerce-black-blue-version/33/express_truck_delivery-2-512.png"
                alt="none"
                style={{
                  height: "100px",
                }}
              />
            </Stack>
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
