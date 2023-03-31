import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Rating,
  Box,
} from "@mui/material";
import boat from "../../img/boat.jpg";
import sofa from "../../img/sofa.png";
import jacket from "../../img/jakets.jpg";
import shoe from "../../img/shoes red.jpg";
import laptop from "../../img/hp laptop.jpg";
import bjackets from "../../img/bjackets.jpg";
import hat from "../../img/hats.jpg";
import jeans from "../../img/jeans.jpg";
import { Stack } from "@mui/system";
import React, { useRef } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Carousel from "react-material-ui-carousel";
import ProductCard from "./ProductCard";

const Trends = (props) => {
  const scrollnow = () => {
    ref.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    ref.current.scrollLeft += 300;
  };
  const ref = useRef(null);

  const product = [
    {
      img: boat,
      img1: laptop,
      img2: jacket,
      name: "Boat headphone",
      price: "1090",
    },
    {
      img: sofa,
      img1: hat,
      img2: jeans,
      name: "Sofaset",
      price: "9900",
    },
    {
      img: jacket,
      img2: hat,
      img1: shoe,
      name: "Exclusive Red jackets for men",
      price: "2900",
    },
    {
      img: shoe,
      img1: boat,
      img2: laptop,
      name: "Red and white sneaker for men",
      price: "500",
    },
    {
      img: laptop,
      img1: hat,
      img2: jeans,
      name: "Hp pavallion 250",
      price: "35000",
    },
    {
      img: hat,
      img1: jeans,
      img2: laptop,
      name: "hats for men",
      price: "0002",
    },

    {
      img: jeans,
      img1: laptop,
      img2: hat,
      name: "jeans for men",
      price: "1000",
    },
    {
      img: bjackets,
      img1: boat,
      img2: hat,
      name: "Exclusive black jackets for men",
      price: "2500",
    },
  ];

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          top: "50%",
          height: "100%",
          width: "99%",
          mx: "5px",
          translate: "0 25vh",
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
        right="0"
        height={"max-content"}
        zIndex={1}
        ref={ref}
        className="trend"
      >
        <Stack direction={"row"} alignItems={"center"} mx="40px">
          <ProductCard product={product} />
        </Stack>
      </Stack>
    </>
  );
};

export default Trends;
