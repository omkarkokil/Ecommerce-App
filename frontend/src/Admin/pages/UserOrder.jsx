import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import hat from "../../img/hats.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import StateContext from "../../Context/hooks/StateContext";
import LoginLoader from "../../utils/LoginLoader";
import { toast } from "react-toastify";
import ApiContext from "../../Context/Api/ApiContext";

const UserOrder = () => {
  const { id } = useParams("");

  const { setIsLoading, isLoading, Order, setOrder } = useContext(StateContext);
  const { toastoption, GetOrder } = useContext(ApiContext);

  const [orderStatus, setOrderStatus] = useState("");

  const handleOrderStatus = (e) => {
    setOrderStatus(e.target.value);
  };

  useEffect(() => {
    GetOrder(id);
  }, [id]);

  const UpdateOrder = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_UPDATE_ORDER}/${id}`,
        { orderStatus }
      );

      if (!data.success) {
        toast.error(data.msg, toastoption);
      }

      if (data.success) {
        toast.success(data.msg, toastoption);
        setOrder((pre) => {
          if (Order.orderStatus === "Delivered") {
            return {
              ...pre,
              PaymentType: "Paid",
            };
          }
          return {
            ...pre,
            orderStatus: orderStatus,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading || Order === null ? (
        <LoginLoader />
      ) : (
        <Stack
          mt={{ xs: Order.orderStatus === "Delivered" ? "40px" : "" }}
          direction={{ md: "row", xs: "column-reverse" }}
        >
          <Stack
            sx={{ my: "50px", ml: "60px" }}
            width={{ md: "60%", xs: "80%" }}
          >
            <Stack mb={"15px"}>
              <Typography fontSize={"1.7em "} variant="h4">
                Shiping Info
              </Typography>
            </Stack>
            <Box>
              <Stack direction={"row"}>
                <Typography variant="body1" mr={"15px"}>
                  Name:
                </Typography>
                <Typography variant="body1" color="#333">
                  {Order && Order.User.name ? Order.User.name : ""}
                </Typography>
              </Stack>
              <Stack direction={"row"} my={"15px"}>
                <Typography variant="body1" mr={"15px"}>
                  Phone:{" "}
                </Typography>
                <Typography variant="body1" color="#333">
                  {Order.ShipingInfo.mob}
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography variant="body1" mr={"15px"}>
                  Address:{" "}
                </Typography>
                <Typography variant="body1" color="#333">
                  {Order.ShipingInfo.address} {Order.ShipingInfo.pincode} ,{" "}
                  {Order.ShipingInfo.State}
                </Typography>
              </Stack>
            </Box>

            <Box width={"80%"} my="10px">
              <Divider />
            </Box>

            <Stack mb="15px" mt={"25px"}>
              <Typography variant="h5">Payment info</Typography>
            </Stack>
            <Box>
              <Stack direction={"row"}>
                <Typography variant="body1" mr={"15px"}>
                  Payment Status:
                </Typography>
                <Typography variant="body1" color="green">
                  {Order.PaymentType}
                </Typography>
              </Stack>
              <Stack direction={"row"} my={"15px"}>
                <Typography variant="body1" mr={"15px"}>
                  Amount:
                </Typography>
                <Typography variant="body1" color="#333">
                  &#8377;{Order.totalPrice}
                </Typography>
              </Stack>
            </Box>

            <Box width={"80%"} my="10px">
              <Divider />
            </Box>

            <Stack mt={"25px"}>
              <Typography variant="h5">Payment info</Typography>
            </Stack>
            <Stack direction={"row"} my={"15px"}>
              <Typography variant="body1" mr={"15px"}>
                Order Status :
              </Typography>
              <Typography variant="body1" color="red">
                {Order.orderStatus}
              </Typography>
            </Stack>

            <Box width={"80%"} my="10px">
              <Divider />
            </Box>
            <Stack>
              <Typography variant="h5" my={"10px"} color="initial">
                Your cart items
              </Typography>

              {Order.OrderData.map((ele, id) => {
                return (
                  <Stack key={id} direction={"row"} my="10px">
                    <Stack width={"max-content"} px={"10px"}>
                      <img
                        src={ele.product.img[0]}
                        style={{ width: "50px" }}
                        alt="none"
                      />
                    </Stack>
                    <Stack
                      direction={"row"}
                      width={"70%"}
                      justifyContent="space-between"
                      alignItems={"center"}
                    >
                      <Box ml={"10px"} width={"50%"}>
                        <Typography variant="body2" color="#333">
                          {ele.product.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="#333">
                        {ele.product.price} x {ele.qty} = &#8377;
                        {ele.product.price * ele.qty}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>

          {Order.orderStatus === "Delivered" ? (
            ""
          ) : (
            <>
              <Box>
                <Divider
                  display={{ md: "block", xs: "none" }}
                  orientation="vertical"
                />
              </Box>

              <Stack
                my={{ md: "50px" }}
                mt={{ xs: "100px" }}
                ml={{ xs: "60px" }}
                width={{ md: "40%", xs: "80%" }}
                position={{ md: "sticky", xs: "static" }}
                sx={{
                  top: "50px",
                  height: "max-content",
                }}
              >
                <Typography variant="h5" color="initial">
                  Process Order
                </Typography>

                <Box width={"70%"}>
                  <FormControl fullWidth sx={{ my: "20px" }}>
                    <InputLabel id="orderStatus">
                      Choose Order status
                    </InputLabel>
                    <Select
                      value={orderStatus}
                      onChange={handleOrderStatus}
                      label="Choose Order status"
                      labelId="orderStatus"
                    >
                      {Order.orderStatus === "Processing" && (
                        <MenuItem value={"Shipped"}>Shipped</MenuItem>
                      )}
                      <MenuItem value={"Delivered"}>Delivered</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    onClick={UpdateOrder}
                    fullWidth
                    color="primary"
                  >
                    Process Order
                  </Button>
                </Box>
              </Stack>
            </>
          )}
        </Stack>
      )}
    </>
  );
};

export default UserOrder;
