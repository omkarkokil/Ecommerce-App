import { Box, Grid, Paper, Skeleton } from "@mui/material";
import { Card, CardContent, Typography, Rating } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import React, { useContext } from "react";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import StateContext from "../../../Context/hooks/StateContext";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

const ProductCard = ({ items }) => {
  const { category, value, filterRating, theme, isLoading } =
    useContext(StateContext);
  return (
    <>
      {items && (
        <Link style={{ margin: "20px" }} to={`/productpage/${items._id}`}>
          <Card
            sx={{
              transition: ".4s all",
              ":hover": {
                scale: "1.05",
                boxShadow: "0 0 5px #777",
              },
              [theme.breakpoints.up("xs")]: {
                width: "200px",
              },

              [theme.breakpoints.up("md")]: {
                width: "250px",
              },
            }}
            elevation={0}
          >
            <Stack
              sx={{
                width: "100%",
                [theme.breakpoints.up("xs")]: {
                  height: "150px",
                },
                [theme.breakpoints.up("sm")]: {
                  height: "175px",
                },

                [theme.breakpoints.up("md")]: {
                  height: "200px",
                },
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
                      height="200px"
                      justifyContent={"center"}
                    >
                      <LazyLoadImage
                        src={element}
                        alt="none"
                        loading="lazy"
                        effect="blur"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Stack>
                  );
                })}
              </Carousel>
            </Stack>

            <CardContent>
              <Typography variant="body1" color="#666">
                {items.name.slice(0, 15)}...
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
      )}
    </>
  );
};

export default ProductCard;
