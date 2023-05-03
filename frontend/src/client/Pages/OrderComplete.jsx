import { Done, ShoppingCart } from "@mui/icons-material";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { green } from "@mui/material/colors";
import Navbar from "../../utils/Navbar";

const OrderComplete = () => {
  const color = green["A400"];
  const shade1 = green[50];
  return (
    <>
      <Navbar />
      <Stack height={"85vh"} justifyContent={"center"} alignItems={"center"}>
        <Avatar sx={{ background: shade1, height: "4.5em", width: "4.5em" }}>
          <Done
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
