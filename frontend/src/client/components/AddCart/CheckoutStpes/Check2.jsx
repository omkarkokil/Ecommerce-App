import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Divider, FormControl, InputAdornment, TextField } from "@mui/material";
import StateContext from "../../../../Context/hooks/StateContext";
import FunctionContext from "../../../../Context/Function/FunctionContext";

const Check2 = () => {
  const {
    cartItem,
    currentUser,
    orderData,
    orderProducts,
    setOrderProducts,
    productPrices,
    setProductPrices,
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
      taxPrice: 40,
      shipingPrice: 40,
    });
    handleNext();
  };

  return (
    <>
      <Stack mt={"30px"} direction={"row"}>
        <Stack width={"70%"} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              background: "#000",
              color: "#fff",
              width: "85%",
              p: "10px",
              boxShadow: "0 0 3px #777",
              my: "10px",
            }}
          >
            <Typography variant="h6" className="obitron">
              SHIPING INFO
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
              variant="h5"
              className="obitron"
              my={"10px"}
              color="initial"
            >
              Your cart items
            </Typography>

            {cartItem.map((ele, id) => {
              return (
                <Stack key={id} direction={"row"} my="10px">
                  <Stack width={"30%"}>
                    <img
                      src={ele.productid.img[0]}
                      style={{ width: "70px" }}
                      alt="none"
                    />
                  </Stack>
                  <Stack
                    direction={"row"}
                    width={"70%"}
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Box width={"60%"}>
                      <Typography variant="body1" color="initial">
                        {ele.productid.name}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="initial">
                      {ele.productid.price} x {ele.qty} = &#8377;
                      {ele.qty * ele.productid.price}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        <Stack width={"30%"} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              background: "#000",
              color: "#fff",
              width: "85%",
              p: "10px",
              boxShadow: "0 0 3px #777",
              my: "10px",
            }}
          >
            <Typography variant="h6" className="obitron">
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
            <Typography variant="body1">Shiping charges</Typography>
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
