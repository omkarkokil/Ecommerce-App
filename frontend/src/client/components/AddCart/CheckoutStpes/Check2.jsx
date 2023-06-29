import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import {
  Divider,
  FormControl,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import StateContext from "../../../../Context/hooks/StateContext";
import FunctionContext from "../../../../Context/Function/FunctionContext";

const Check2 = () => {
  const {
    cartItem,
    currentUser,
    orderData,
    setOrderProducts,
    setProductPrices,
    theme,
  } = React.useContext(StateContext);
  const { handleNext } = React.useContext(FunctionContext);

  const result = cartItem.reduce(function (acc, obj) {
    return acc + obj.productid.price * obj.qty;
  }, 0);

  const products = cartItem.map((element) => {
    return { product: element.productid._id, qty: element.qty };
  });

  const GoNext = () => {
    setOrderProducts(products);
    setProductPrices({
      totalPrice: result,
      taxPrice: 0,
      shipingPrice: 40,
    });
    handleNext();
  };

  return (
    <>
      <Stack mt={"30px"} direction={{ md: "row", xs: "column-reverse" }}>
        <Stack width={{ md: "70%", xs: "100%" }} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: "85%",
              p: "10px",
              my: "10px",
              [theme.breakpoints.up("md")]: {
                background: "#000",
                boxShadow: "0 0 3px #777",
                color: "#fff",
              },
              [theme.breakpoints.up("xs")]: {
                background: "#fff",
                boxShadow: "none",
                color: "#000",
              },
            }}
          >
            <Typography
              variant={"h5"}
              fontSize={{ md: "1.2em", xs: "1.5em" }}
              className="obitron"
            >
              SHIPPING INFO
            </Typography>
          </Box>
          <Stack width={"80%"}>
            <Typography variant="body1" color="initial">
              Name : {currentUser.name}
            </Typography>
            <Typography variant="body1" my={"5px"} color="initial">
              Phone : {orderData.mob}
            </Typography>
            <Typography variant="body1" color="initial">
              Address : {orderData.address} , {orderData.pincode},{" "}
              {orderData.State.name}
            </Typography>
          </Stack>
          <Box width={"80%"} my="10px">
            <Divider />
          </Box>
          <Stack width={"80%"}>
            <Typography
              variant={"h6"}
              fontSize={"1.2em"}
              className="obitron"
              my={"10px"}
              color="initial"
            >
              Your cart items
            </Typography>

            {cartItem.map((ele, id) => {
              return (
                <Stack
                  key={id}
                  // justifyContent={"space-between"}
                  direction={{ md: "row", xs: "column" }}
                  my="10px"
                >
                  <Stack direction={"row"} width={{ md: "80%", xs: "100%" }}>
                    <Paper
                      elevation={0}
                      component={"img"}
                      src={ele.productid.img[0]}
                      width={"70px"}
                      height={"70px"}
                      alt="none"
                    />

                    <Box mx="20px">
                      <Typography
                        variant="body1"
                        fontWeight={"bold"}
                        color="initial"
                      >
                        {ele.productid.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        my="5px"
                        color={"red"}
                        fontSize="1.05em"
                      >
                        &#8377;{ele.productid.price}
                      </Typography>
                      <Typography variant="body1">Qty : {ele.qty}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        <Stack width={{ md: "30%", xs: "100%" }} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: "85%",
              p: "10px",
              my: "10px",
              [theme.breakpoints.up("md")]: {
                background: "#000",
                boxShadow: "0 0 3px #777",
                color: "#fff",
              },
              [theme.breakpoints.up("xs")]: {
                background: "#fff",
                boxShadow: "none",
                color: "#000",
              },
            }}
          >
            <Typography
              variant={"h5"}
              fontSize={{ md: "1.2em", xs: "1.5em" }}
              className="obitron"
            >
              ORDER SUMMARY
            </Typography>
          </Box>
          <Stack
            direction={"row"}
            width={"85%"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">&#8377; {result}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            width={"85%"}
            my="20px"
            justifyContent={"space-between"}
          >
            <Typography variant="body1">Shipping Charges</Typography>
            <Typography variant="body1">&#8377;40 </Typography>
          </Stack>
          <Stack
            direction={"row"}
            width={"85%"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1">gst :</Typography>
            <Typography variant="body1">&#8377;0 </Typography>
          </Stack>
          <Box width={"85%"} my="15px">
            <Divider />
          </Box>
          <Stack
            direction={"row"}
            width={"85%"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1">Total :</Typography>
            <Typography variant="body1">&#8377;{result} </Typography>
          </Stack>
          <Stack alignItems={"flex-end"} my="20px" width="85%">
            <Button
              variant="contained"
              sx={{ width: "max-content" }}
              color="primary"
              onClick={GoNext}
            >
              Proceed to payment
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Check2;
