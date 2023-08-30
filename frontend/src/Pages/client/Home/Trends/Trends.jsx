import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Rating,
  Box,
  Skeleton,
} from "@mui/material";

import { Stack } from "@mui/system";
import React, { Suspense, useContext, useRef } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import StateContext from "../../../../Context/hooks/StateContext";
import SkeletonLoader from "../../../../utils/Loaders/Skeletons/SkeletonLoader";

import ProductCard from "../Product/ProductCard/ProductCard";

const Trends = (props) => {
  const scrollnow = () => {
    ref.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    ref.current.scrollLeft += 300;
  };
  const ref = useRef(null);

  const { topPurchaseProduct, theme, isLoading } = useContext(StateContext);

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          top: "25%",
          height: "100%",
          width: "99%",
          mx: "5px",
          [theme.breakpoints.up("xs")]: {
            translate: "0 18vh",
          },

          [theme.breakpoints.up("md")]: {
            translate: "0 25vh",
          },
          zIndex: 10,
        }}
      >
        <IconButton onClick={scrollnow} color="primary">
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton onClick={scrollRight} color="primary">
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>

      <Stack
        direction="row"
        overflow="auto"
        left="0"
        right="10"
        height={"max-content"}
        zIndex={1}
        ref={ref}
        className="trend"
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{
            [theme.breakpoints.up("xs")]: {
              mx: "15px",
            },

            [theme.breakpoints.up("md")]: {
              mx: "40px",
            },
          }}
        >
          {isLoading ? (
            <SkeletonLoader count={5} />
          ) : (
            topPurchaseProduct &&
            topPurchaseProduct?.map((items, id) => {
              return <ProductCard items={items.productInfo} key={id} />;
            })
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Trends;
