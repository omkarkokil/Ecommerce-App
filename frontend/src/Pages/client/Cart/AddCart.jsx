import {
  Typography,
  Button,
  Divider,
  Badge,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";

import { blue } from "@mui/material/colors";

import { Link } from "react-router-dom";
import { Add, Delete, Remove, ShoppingCart } from "@mui/icons-material";
import Navbar from "../../../utils/Navbar/Navbar";
import ApiContext from "../../../Context/Api/ApiContext";
import StateContext from "../../../Context/hooks/StateContext";
import LoginLoader from "../../../utils/Loaders/LoginLoader";
import FunctionContext from "../../../Context/Function/FunctionContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddCart = () => {
  const { RemoveCart, GetCart, toastoption, navigate } = useContext(ApiContext);
  const { cartItem, isLoading, isLogin, theme, currentUser } =
    useContext(StateContext);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [window.location.pathname, currentUser]);
  const results = cartItem.reduce((i, v) => {
    return (i = i + v.productid.price * v.qty);
  }, 0);

  // const gst = Math.round((results * 18) / 100);

  const color = blue["A400"];
  const shade1 = blue[50];

  const updateCartQuantity = async (productid, qty) => {
    try {
      if (qty === 0) {
        RemoveCart(productid);
      } else {
        const { data } = await axios.put(
          `${process.env.REACT_APP_UPDATE_CART}`,
          { productid, qty },
          {
            headers: {
              Authorization: localStorage.getItem("user"),
            },
          }
        );

        if (!data.status) {
          toast.success(data.msg, toastoption);
        }

        if (data.status) {
          toast.success(data.msg, toastoption);
          GetCart();
        }
      }
    } catch (error) {
      console.log("Error updating cart quantity:", error);
    }
  };

  return (
    <>
      <Navbar />
      {isLoading && <LoginLoader />}
      {cartItem?.length <= 0 ? (
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
            <ShoppingCart
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
            Your cart is empty view products
          </Typography>
          <Link to="/products">
            <Button variant="contained" color="primary">
              View Products
            </Button>
          </Link>
        </Stack>
      ) : (
        <Stack
          direction={{ md: "row", xs: "column-reverse" }}
          sx={{
            [theme.breakpoints.up("xs")]: {
              alignItems: "center",
            },

            [theme.breakpoints.up("md")]: {
              alignItems: "flex-start",
            },
          }}
        >
          <Stack
            sx={{
              [theme.breakpoints.up("xs")]: {
                width: "90%",
              },
              alignItems: "center",

              [theme.breakpoints.up("md")]: {
                width: "70%",
                mt: "100px",
              },
            }}
          >
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
              <Typography variant="h6" className="obitron">
                YOUR CART
              </Typography>
            </Box>

            {cartItem.map((ele, id) => {
              return (
                <Stack width={"85%"} key={id}>
                  <Stack direction={"row"}>
                    <Stack
                      alignItems={"center"}
                      justifyContent="center"
                      width={"40%"}
                    >
                      <Paper
                        component={"img"}
                        elevation={0}
                        src={ele.productid.img[0]}
                        sx={{
                          width: "100px",
                        }}
                        alt="none"
                      />
                    </Stack>
                    <Stack
                      width={"-webkit-fill-available"}
                      ml={"10px"}
                      mt="10px"
                    >
                      <Stack
                        direction={{ md: "row", xs: "column" }}
                        justifyContent="space-between"
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            [theme.breakpoints.up("xs")]: {
                              fontSize: "1em",
                              width: "95%",
                            },
                            [theme.breakpoints.up("md")]: {
                              fontSize: "1.1em",
                              width: "80%",
                            },
                          }}
                        >
                          {ele.productid.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontSize={{ sm: "1.25rem", xs: "1.1em" }}
                        >
                          {" "}
                          &#8377; {ele.productid.price}
                        </Typography>
                      </Stack>
                      <Stack my={"5px"}>
                        <Typography
                          variant="body2"
                          fontSize={{ sm: "0.875rem", xs: ".8em" }}
                          color="initial"
                        >
                          Available in stock
                        </Typography>
                      </Stack>
                      <Box sx={{ my: "10px" }}>
                        <Stack
                          direction="row"
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Stack direction="row" alignItems={"center"}>
                            <IconButton
                              color="success"
                              onClick={() =>
                                updateCartQuantity(
                                  ele.productid._id,
                                  ele.qty + 1
                                )
                              }
                            >
                              <Add />
                            </IconButton>
                            <Typography
                              variant="body1"
                              mx={"10px"}
                              color="initial"
                            >
                              {" "}
                              {ele.qty}
                            </Typography>
                            <IconButton
                              color="error"
                              onClick={() =>
                                updateCartQuantity(
                                  ele.productid._id,
                                  ele.qty - 1
                                )
                              }
                            >
                              <Remove />
                            </IconButton>
                          </Stack>
                          <Tooltip title="Remove item fron cart">
                            <IconButton
                              color="error"
                              onClick={() => RemoveCart(ele.productid._id)}
                              width="max-content"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Box>
                    </Stack>
                  </Stack>

                  <Box width={"100%"}>
                    <Divider />
                  </Box>
                </Stack>
              );
            })}
          </Stack>
          <Stack
            sx={{
              [theme.breakpoints.up("xs")]: {
                width: "90%",
              },
              [theme.breakpoints.up("md")]: {
                width: "40%",
              },
            }}
          >
            <Stack
              mt={"100px"}
              // width={"70%"}
              sx={{
                alignItems: "center",
                position: "sticky",
                top: " 10%",
                right: "0",
                [theme.breakpoints.up("xs")]: {
                  // boxShadow: "0 0 3px #999",
                },
                [theme.breakpoints.up("md")]: {
                  width: "70%",
                },
              }}
            >
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
                <Typography variant="h6" className="obitron">
                  SUMMARY
                </Typography>
              </Box>
              <Stack
                width="85%"
                direction={"row"}
                alignItems="center"
                my={"15px"}
                justifyContent="space-between"
              >
                <Stack direction={"row"} width="35%" alignItems="center">
                  <Typography variant="body1" mr={"15px"} fontSize={"1.1em"}>
                    Subtotal{" "}
                  </Typography>
                  <Badge badgeContent={cartItem.length} color="primary" />
                </Stack>
                <Typography variant="body1" fontSize={"1.1em"}>
                  &#8377; {results}
                </Typography>
              </Stack>
              <Box width={"85%"}>
                <Divider />
              </Box>
              <Stack
                width="85%"
                direction={"row"}
                alignItems="center"
                my={"15px"}
                justifyContent="space-between"
              >
                <Typography variant="body1" fontSize={"1.1em"}>
                  Shipping charges{" "}
                </Typography>
                <Typography variant="body1" fontSize={"1.1em"}>
                  &#8377; 0
                </Typography>
              </Stack>
              <Box width={"85%"}>
                <Divider />
              </Box>
              <Stack
                width="85%"
                direction={"row"}
                alignItems="center"
                my={"20px"}
                justifyContent="space-between"
              >
                <Typography variant="body1" fontSize={"1.1em"}>
                  Gst{" "}
                </Typography>
                <Typography variant="body1" fontSize={"1.1em"}>
                  {/* {gst} */} 0
                </Typography>
              </Stack>
              <Box width={"85%"}>
                <Divider />
              </Box>
              <Stack
                width="85%"
                direction={"row"}
                alignItems="center"
                my={"15px"}
                justifyContent="space-between"
              >
                <Typography variant="body1" fontSize={"1.1em"}>
                  Total amount{" "}
                </Typography>
                <Typography variant="body1" fontSize={"1.1em"}>
                  &#8377; {results}
                </Typography>
              </Stack>
              <Box width={"85%"}>
                <Divider />
              </Box>
              <Stack
                width="85%"
                direction={"row"}
                alignItems="center"
                my={"15px"}
                justifyContent="flex-end"
              >
                <Link to="/checkout">
                  <Button variant="contained" color="primary">
                    Checkout
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default AddCart;
