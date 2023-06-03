import { Grid } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Rating,
  Box,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import StateContext from "../../../Context/hooks/StateContext";

const ProductCard = (props) => {
  const { category, value, filterRating } = useContext(StateContext);
  return (
    <>
      {props.product
        .filter((item) => {
          return category === undefined || category === ""
            ? item
            : item.category === category;
        })
        .filter((item) => {
          return value === undefined || value === ""
            ? item
            : item.price > value[0] && item.price < value[1];
        })
        .filter((item) => {
          return filterRating === undefined || filterRating === ""
            ? item
            : item.avgrate >= filterRating;
        })
        .map((items, id) => {
          return (
            <Link key={id} to={`/productpage/${items._id}`}>
              <Card
                sx={{
                  width: "250px",
                  m: "20px",
                  transition: ".4s all",
                  ":hover": {
                    scale: "1.05",
                    boxShadow: "0 0 5px #777",
                  },
                }}
                elevation={0}
              >
                <Stack
                  sx={{
                    height: "200px",
                    width: "100%",
                  }}
                >
                  <Carousel
                    interval={3000}
                    navButtonsAlwaysInvisible
                    indicators={false}
                  >
                    {items.img.map((element, id) => {
                      return (
                        <Stack
                          key={id}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <img src={element} width={"200px"} alt="" />
                        </Stack>
                      );
                    })}
                  </Carousel>
                </Stack>
                <CardContent>
                  <Typography variant="body1" color="#666">
                    {items.name.slice(0, 20)}...
                  </Typography>
                  <Rating
                    size="small"
                    sx={{ mt: "10px" }}
                    readOnly
                    value={items.avgrate}
                  />
                  <Typography variant="body1" color={"error"}>
                    &#8377;{items.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
    </>
  );
};

export default ProductCard;
