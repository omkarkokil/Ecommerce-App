import { Done, ShoppingCart } from "@mui/icons-material";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { green } from "@mui/material/colors";
import Navbar from "../../../../utils/Navbar/Navbar";
import axios from "axios";
import ApiContext from "../../../../Context/Api/ApiContext";
import StateContext from "../../../../Context/hooks/StateContext";

const OrderComplete = () => {
  const color = green["A400"];
  const shade1 = green[50];

  const { theme } = useContext(StateContext);

  return (
    <>
      <Navbar />
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
          <Done
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
          textAlign={"center"}
        >
          Your order has been placed successfully
        </Typography>
        <Link to="/products">
          <Button variant="contained" color="success">
            View Products
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default OrderComplete;
