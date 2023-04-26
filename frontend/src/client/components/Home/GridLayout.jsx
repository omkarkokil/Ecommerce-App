import { Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/material";

import React, { useContext, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import StateContext from "../../../Context/hooks/StateContext";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "../../../utils/SkeletonLoader";
import axios from "axios";
import ApiContext from "../../../Context/Api/ApiContext";
import { useParams } from "react-router-dom";

const GridLayout = () => {
  const {
    allProducts,
    productPage,
    setProductPage,
    setAllProducts,
    isLoading,
    hasMore,
    search,
    setHasMore,
    productCount,
  } = useContext(StateContext);

  const { getProducts } = useContext(ApiContext);
  const { id } = useParams();

  const fetchData = async () => {
    axios
      .get(process.env.REACT_APP_GET_ALL_PRODUCT_URL, {
        params: {
          page: productPage,
          size: process.env.REACT_APP_PRODUCT_LIMIT,
          search: id,
        },
      })
      .then((response) => {
        setProductPage((productPage) => productPage + 1);
        setAllProducts([...allProducts, ...response.data.products]);
        if (response.data.products.length === 0) {
          setHasMore(false);
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  useEffect(() => {
    getProducts(id);
  }, [window.location.pathname]);

  return (
    <>
      <InfiniteScroll
        dataLength={allProducts.length}
        next={fetchData}
        hasMore={hasMore}
        loader={allProducts.length === 0 ? "" : <SkeletonLoader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <Grid
            container
            justifyContent={"center"}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item md={10}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 3,
                    width: 250,
                    height: "max-content",
                    marginTop: "30px",
                  },
                }}
              >
                <ProductCard product={allProducts} />
              </Box>
            </Grid>
          </Grid>
        )}
      </InfiniteScroll>
    </>
  );
};

export default GridLayout;
