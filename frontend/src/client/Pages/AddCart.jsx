import {
  Typography,
  Button,
  Divider,
  Badge,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";

import { blue } from "@mui/material/colors";

import { Link } from "react-router-dom";
import { Add, Delete, Remove, ShoppingCart } from "@mui/icons-material";
import Navbar from "../../utils/Navbar";
import ApiContext from "../../Context/Api/ApiContext";
import StateContext from "../../Context/hooks/StateContext";
import LoginLoader from "../../utils/LoginLoader";
import FunctionContext from "../../Context/Function/FunctionContext";

const AddCart = () => {
  const { RemoveCart } = useContext(ApiContext);
  const { cartItem, isLoading } = useContext(StateContext);

  const results = cartItem.reduce((i, v) => {
    return (i = i + v.productid.price * v.qty);
  }, 0);

  // const gst = Math.round((results * 18) / 100);

  const color = blue["A400"];
  const shade1 = blue[50];

  return (
    <>
      <Navbar />
      {isLoading ? (
        <LoginLoader />
      ) : cartItem.length <= 0 ? (
        <Stack height={"85vh"} justifyContent={"center"} alignItems={"center"}>
          <Avatar sx={{ background: shade1, height: "5em", width: "5em" }}>
            <ShoppingCart
              sx={{
                fontSize: "3em",
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
            Your cart is empty view products
          </Typography>
          <Link to="/products">
            <Button variant="contained" color="primary">
              View Products
            </Button>
          </Link>
        </Stack>
      ) : (
        <Stack direction={"row"}>
          <Stack my={"10vh"} width={"70%"} sx={{ alignItems: "center" }}>
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
                      <img
                        src={ele.productid.img[0]}
                        style={{ width: "100px" }}
                        alt=""
                      />
                    </Stack>
                    <Stack
                      width={"-webkit-fill-available"}
                      ml={"10px"}
                      mt="10px"
                    >
                      <Stack direction={"row"} justifyContent="space-between">
                        <Typography
                          variant="h6"
                          width={"80%"}
                          fontSize={"1.1em"}
                        >
                          {ele.productid.name}
                        </Typography>
                        <Typography variant="h6">
                          {" "}
                          &#8377; {ele.productid.price * ele.qty}
                        </Typography>
                      </Stack>
                      <Stack my={"5px"}>
                        <Typography variant="body2" color="initial">
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
                            <IconButton color="success">
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
                            <IconButton color="error">
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
          <Stack width={"40%"}>
            <Stack
              my={"10vh"}
              width={"70%"}
              sx={{
                alignItems: "center",
                position: "sticky",
                top: " 10%",
                right: "0",
              }}
            >
              <Box
                sx={{
                  background: "#000",
                  color: "#fff",
                  width: "85%",
                  p: "10px",
                  boxShadow: "0 0 3px #777",
                  mt: "10px",
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
