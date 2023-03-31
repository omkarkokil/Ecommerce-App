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
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <>
      {props.product.map((ele, id) => {
        return (
          <Link key={id} to={"/productpage/1"}>
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
                  <Stack
                    width={"100%"}
                    height="200px"
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <img src={`${ele.img}`} width="70%" alt="none" />
                  </Stack>
                  <Stack
                    width={"100%"}
                    height="200px"
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <img src={`${ele.img1}`} width="70%" alt="none" />
                  </Stack>
                  <Stack
                    width={"100%"}
                    height="200px"
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <img src={`${ele.img2}`} width="70%" alt="none" />
                  </Stack>
                </Carousel>
              </Stack>
              <CardContent>
                <Typography variant="body1" color="#666">
                  {ele.name.slice(0, 20)}...
                </Typography>
                <Rating size="small" sx={{ mt: "10px" }} readOnly value={3} />
                <Typography variant="body1" color={"error"}>
                  &#8377;{ele.price}
                </Typography>

                {/* <Stack
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
                </Stack> */}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </>
  );
};

export default ProductCard;
