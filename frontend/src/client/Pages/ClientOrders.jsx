import {
  Box,
  Stack,
  Typography,
  Tooltip,
  Button,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
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

  const { myOrders, currentUser, isLoading, theme } = useContext(StateContext);
  const { MyOrders } = useContext(ApiContext);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    MyOrders();
  }, []);

  return (
    <div>
      <Navbar />

      {isLoading ? (
        <LoginLoader />
      ) : myOrders.length === 0 ? (
        <Stack height={"85vh"} justifyContent={"center"} alignItems={"center"}>
          <Avatar
            sx={{
              background: shade1,
              [theme.breakpoints.up("xs")]: {
                height: "3.5em",
                width: "3.5em",
              },

              [theme.breakpoints.up("md")]: {
                height: "5em",
                width: "5em",
              },
            }}
          >
            <Store
              sx={{
                [theme.breakpoints.up("xs")]: {
                  fontSize: "2em",
                },

                [theme.breakpoints.up("md")]: {
                  fontSize: "3em",
                },
                color: color,
              }}
            />
          </Avatar>
          <Typography
            variant="h4"
            fontSize={{ md: "2.5em", xs: "1.7em" }}
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
          <Stack
            backgroundColor={{ xs: "#f0f0f0", md: "transparent" }}
            mt={{ md: "80px" }}
            alignItems={"center"}
          >
            <Box
              sx={{
                [theme.breakpoints.up("md")]: {
                  background: "#000",
                  boxShadow: "0 0 3px #777",
                  color: "#fff",
                  my: "20px",
                },
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
                YOUR ORDER
              </Typography>
            </Box>
          </Stack>

          {myOrders.map((ele, id) => {
            return (
              <Stack
                justifyContent={"center"}
                my="10px"
                key={id}
                alignItems={"center"}
              >
                <Stack
                  width={"80%"}
                  borderRadius={"10px"}
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      boxShadow: "none",
                    },
                    [theme.breakpoints.up("md")]: {
                      boxShadow: "1px 1px 3px #666",
                    },
                  }}
                >
                  <Stack
                    direction={"row"}
                    backgroundColor={shade1}
                    padding="10px"
                    justifyContent="space-between"
                    borderRadius={"10px 10px 0 0"}
                    sx={{
                      [theme.breakpoints.up("xs")]: {
                        display: "none",
                      },
                      [theme.breakpoints.up("md")]: {
                        display: "flex",
                      },
                    }}
                  >
                    <Stack
                      direction={"row"}
                      width="50%"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography variant="h6" fontSize="17px">
                          Order{" "}
                          {ele.orderStatus === "Delivered"
                            ? "Delievered"
                            : "Status"}
                        </Typography>
                        <Typography
                          variant="body1"
                          width="max-content"
                          color="error"
                          borderRadius={"3px"}
                        >
                          {ele.orderStatus === "Delivered"
                            ? formatDate(ele.deliveredAt)
                            : ele.orderStatus}
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
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    p={"10px"}
                    display={{ md: "none" }}
                    color={ele.orderStatus === "Delivered" ? "green" : "red"}
                  >
                    {ele.orderStatus === "Delivered"
                      ? `Delivered ${formatDate(ele.deliveredAt)}`
                      : `${ele.orderStatus}`}
                  </Typography>
                  {ele.OrderData.map((item, id) => {
                    return (
                      <Stack
                        direction={"row"}
                        key={id}
                        mb={"5px"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                      >
                        <Stack my={"10px"} ml="20px">
                          <Paper
                            component={"img"}
                            src={item.product.img[0]}
                            elevation={0}
                            sx={{
                              [theme.breakpoints.up("xs")]: {
                                width: "60px",
                                height: "60px",
                              },
                            }}
                            alt="none"
                          />
                        </Stack>
                        <Stack ml={{ md: "50px", xs: "20px" }} width={"70%"}>
                          <Link to={`/productpage/${item.product._id}`}>
                            <Typography
                              variant="h6"
                              color={{ md: "#1976d2", xs: "#333" }}
                              fontSize={{ md: "1em", xs: "1.2em" }}
                            >
                              {item.product.name}
                            </Typography>
                          </Link>
                        </Stack>
                      </Stack>
                    );
                  })}
                  <Stack
                    display={{ md: "none", xs: "flex" }}
                    ml="20px"
                    direction={"row"}
                    my={"10px"}
                  >
                    <Link to={`/orderReport/${ele._id}`}>
                      <Button variant="outlined" size="small" color="primary">
                        View Order
                      </Button>
                    </Link>
                  </Stack>
                </Stack>
                <Box width={"95%"} display={{ md: "none", xs: "block" }}>
                  <Divider />
                </Box>
              </Stack>
            );
          })}
        </Stack>
      )}
    </div>
  );
};

export default ClientOrders;
