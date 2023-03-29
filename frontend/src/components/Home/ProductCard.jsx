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

import React, { useState } from "react";
import { Stack } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductCard = (props) => {
  return (
    <>
      {props.product.map((ele, id) => {
        return (
          <Card
            sx={{
              width: "250px",
              m: "20px",
            }}
            elevation={3}
            key={id}
          >
            <Stack
              sx={{
                height: "200px",
                width: "100%",
              }}
            >
              <Carousel
                interval={3000}
                // navButtonsAlwaysInvisible
                indicators={false}
              >
                <Stack
                  width={"100%"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <img src={`${ele.img}`} height="200px" alt="none" />
                </Stack>
                <Stack
                  width={"100%"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <img src={`${ele.img1}`} height="200px" alt="none" />
                </Stack>
                <Stack
                  width={"100%"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <img src={`${ele.img2}`} height="200px" alt="none" />
                </Stack>
              </Carousel>
            </Stack>
            <CardContent>
              <Typography variant="body1" color="#666">
                {ele.name.slice(0, 25)}...
              </Typography>
              <Rating size="small" sx={{ mt: "10px" }} readOnly value={3} />
              <Typography variant="h6" color="#111">
                {ele.price} Rs
              </Typography>

              <Stack
                direction={"row"}
                justifyContent="space-between"
                alignItems={"center"}
                mt="10px"
              >
                <Button
                  variant="outlined"
                  sx={{
                    ":hover": {
                      background: "#9c27b0",
                      color: "#fff",
                    },
                  }}
                  color="secondary"
                >
                  Add to cart
                </Button>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default ProductCard;
