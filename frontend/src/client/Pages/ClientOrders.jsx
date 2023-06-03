import { Box, Stack, Typography, Tooltip, Button, Avatar } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { blue } from "@mui/material/colors";
import boat from "../../img/boat.jpg";
import { styled } from "@mui/material/styles";
import { Close, Delete, Edit, Login, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Navbar from "../../utils/Navbar";
import ApiContext from "../../Context/Api/ApiContext";
import StateContext from "../../Context/hooks/StateContext";
import LoginLoader from "../../utils/LoginLoader";

const ClientOrders = () => {
  const color = blue["A100"];
  const shade1 = blue[50];

  const { myOrders, currentUser, isLoading } = useContext(StateContext);
  const { MyOrders } = useContext(ApiContext);

  useEffect(() => {
    MyOrders();
  }, []);

  return (
    <div>
      <Navbar />

      <Stack sx={{ my: "5%" }}>
        {isLoading ? (
          <LoginLoader />
        ) : myOrders.length === 0 ? (
          <Stack
            height={"60vh"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar sx={{ background: shade1, height: "5em", width: "5em" }}>
              <Store
                sx={{
                  fontSize: "4em",
                  color: color,
                }}
              />
            </Avatar>
            <Typography
              variant="h4"
              fontSize={"2.5em"}
              sx={{ my: "20px" }}
              color="initial"
            >
              You have not yet had any orders
            </Typography>
            <Link to="/products">
              <Button variant="contained" color="primary">
                View Products
              </Button>
            </Link>
          </Stack>
        ) : (
          <Stack>
            <Stack alignItems={"center"}>
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
                  YOUR ORDER
                </Typography>
              </Box>
            </Stack>

            {myOrders.map((ele, id) => {
              return (
                <Stack
                  justifyContent={"center"}
                  my="10px"
                  alignItems={"center"}
                >
                  <Stack
                    width={"80%"}
                    boxShadow={"1px 1px 3px #666"}
                    borderRadius={"10px"}
                  >
                    <Stack
                      direction={"row"}
                      backgroundColor={shade1}
                      padding="10px"
                      justifyContent="space-between"
                      borderRadius={"10px"}
                    >
                      <Stack
                        direction={"row"}
                        width="50%"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography variant="h6" fontSize="17px">
                            Order Status
                          </Typography>
                          <Typography
                            variant="body1"
                            width="max-content"
                            color="error"
                            borderRadius={"3px"}
                          >
                            {ele.orderStatus}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="h6" fontSize="17px">
                            Total amount
                          </Typography>
                          <Typography
                            variant="body1"
                            width="max-content"
                            color="green"
                            borderRadius={"3px"}
                          >
                            &#8377; {ele.totalPrice}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="h6" fontSize="17px">
                            Shipment To
                          </Typography>
                          <Tooltip
                            title={`${ele.ShipingInfo.address},${ele.ShipingInfo.State} ${ele.ShipingInfo.pincode},Mobileno:${ele.ShipingInfo.mob} `}
                          >
                            <Typography
                              sx={{ cursor: "pointer" }}
                              variant="body1"
                              color={"primary"}
                            >
                              {currentUser.name}
                            </Typography>
                          </Tooltip>
                        </Box>

                        <Box>
                          <Typography variant="h6" fontSize="17px">
                            Payment type
                          </Typography>
                          <Typography
                            variant="body2"
                            backgroundColor={
                              ele.PaymentType === "Paid" ? "green" : "red"
                            }
                            width="max-content"
                            color="#fff"
                            padding={"2px"}
                            borderRadius={"3px"}
                          >
                            {ele.PaymentType}
                          </Typography>
                        </Box>
                      </Stack>
                      <Box>
                        <Typography variant="h6" fontSize="17px">
                          Order ID
                        </Typography>
                        <Typography
                          variant="body2"
                          width="max-content"
                          color={"red"}
                        >
                          {ele._id}
                        </Typography>
                      </Box>
                    </Stack>

                    {ele.OrderData.map((ele, id) => {
                      return (
                        <Stack
                          direction={"row"}
                          mt="20px"
                          key={id}
                          mb={"5px"}
                          alignItems={"center"}
                          justifyContent={"flex-start"}
                        >
                          <Stack my={"10px"} mx="20px">
                            <img
                              src={ele.product.img[0]}
                              width="100px"
                              height="100px"
                              alt=""
                            />
                          </Stack>
                          <Stack ml={"50px"} width={"70%"}>
                            <Typography variant="body1" color={"primary"}>
                              {ele.product.name}
                            </Typography>
                            <Typography variant="body2" mb={"10px"}>
                              Estimeted Time:- 16 may
                            </Typography>

                            <Stack direction={"row"}>
                              <Button
                                color="error"
                                size="small"
                                variant="contained"
                              >
                                Cancal order
                              </Button>
                              <Link to={`/productpage/${ele.product._id}`}>
                                <Button
                                  color="primary"
                                  sx={{ mx: "20px" }}
                                  size="small"
                                  variant="outlined"
                                >
                                  View Product
                                </Button>
                              </Link>
                            </Stack>
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        )}
      </Stack>
    </div>
  );
};

export default ClientOrders;
