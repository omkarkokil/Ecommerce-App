import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Navbar from "../../utils/Navbar";
import StateContext from "../../Context/hooks/StateContext";
import { useParams } from "react-router-dom";
import ApiContext from "../../Context/Api/ApiContext";
import LoginLoader from "../../utils/LoginLoader";

const MobileOrder = () => {
  const { theme, Order, isLoading } = useContext(StateContext);
  const { id } = useParams("");
  const { GetOrder } = useContext(ApiContext);

  useEffect(() => {
    GetOrder(id);
  }, [id]);
  return (
    <>
      {isLoading || Order === null ? (
        <LoginLoader />
      ) : (
        <>
          <Navbar />
          <Stack
            backgroundColor={{ xs: "#f0f0f0", md: "transparent" }}
            alignItems={"center"}
          >
            <Box
              sx={{
                [theme.breakpoints.up("xs")]: {
                  background: "#fff",
                  boxShadow: "none",
                  backgroundColor: "#f0f0f0",
                  color: "#000",
                  mt: "80px",
                },
                width: "85%",
                p: "10px",
              }}
            >
              <Typography variant="h6" className="obitron">
                VIEW ORDER DETAILS
              </Typography>
            </Box>
          </Stack>
          <Stack mx={"50px"} mt={"20px"}>
            <Stack>
              <Typography fontSize={"1.7em "} mb={"15px"} variant="h4">
                Shiping Info
              </Typography>
              <Box>
                <Typography variant="body1" color="#333">
                  {Order && Order.User.name ? Order.User.name : ""}
                </Typography>
                <Typography variant="body1" color="#333">
                  {Order.ShipingInfo.mob}
                </Typography>
                <Typography variant="body1" color="#333">
                  {Order.ShipingInfo.address}
                </Typography>
                <Typography variant="body1" color="#333">
                  {Order.ShipingInfo.pincode} ,{" "}
                </Typography>
                <Typography variant="body1" color="#333">
                  {Order.ShipingInfo.State}
                </Typography>
              </Box>
            </Stack>

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
              <Typography variant="h5">Order Status</Typography>
            </Stack>

            <Typography variant="body1" my="5px" color="red">
              {Order.orderStatus}
            </Typography>

            <Box width={"80%"} my="10px">
              <Divider />
            </Box>
            <Stack>
              <Typography variant="h5" my={"10px"} color="initial">
                Order items
              </Typography>

              {Order.OrderData.map((ele, id) => {
                return (
                  <Stack key={id} direction={"row"} my="10px">
                    <Stack width={"max-content"}>
                      <img
                        src={ele.product.img[0]}
                        style={{ width: "50px" }}
                        alt="none"
                      />
                    </Stack>

                    <Stack
                      direction={"row"}
                      justifyContent="space-between"
                      width={"80%"}
                      alignItems={"center"}
                    >
                      <Box ml={"10px"} width={"70%"}>
                        <Typography variant="body2" color="#333">
                          {ele.product.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="#333">
                          {ele.product.price} x {ele.qty} =
                        </Typography>
                        <Typography variant="body2" color="#333">
                          &#8377;{ele.product.price * ele.qty}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default MobileOrder;
