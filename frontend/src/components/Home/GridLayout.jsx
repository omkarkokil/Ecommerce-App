import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import boat from "../../img/boat.jpg";
import sofa from "../../img/sofa.png";
import jacket from "../../img/jakets.jpg";
import shoe from "../../img/shoes red.jpg";
import laptop from "../../img/hp laptop.jpg";
import bjackets from "../../img/bjackets.jpg";
import hat from "../../img/hats.jpg";
import jeans from "../../img/jeans.jpg";

import React from "react";
import { Stack } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProductCard from "./ProductCard";

const newProduct = [
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
    img1: shoe,
    img2: hat,
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

const GridLayout = () => {
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item md={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 3,
                width: 250,
                height: "max-content",
                marginTop: "30px",
              },
            }}
          >
            <ProductCard product={newProduct} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default GridLayout;
