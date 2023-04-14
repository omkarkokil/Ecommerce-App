import { Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ApiContext from "../../Context/Api/ApiContext";
import StateContext from "../../Context/hooks/StateContext";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "../../utils/SkeletonLoader";
import { useAsyncValue } from "react-router-dom";
import FunctionContext from "../../Context/Function/FunctionContext";
import axios from "axios";

const GridLayout = () => {
  // const { GetAllProducts } = useContext(ApiContext);
  const { totalPagesCalculator } = useContext(FunctionContext);
  const {
    allProducts,
    productPage,
    productCount,
    setProductPage,
    setAllProducts,
    setIsLoading,
  } = useContext(StateContext);

  const [hasMore, setHasMore] = useState(true);
  let total = totalPagesCalculator(
    productCount,
    process.env.REACT_APP_PRODUCT_LIMIT
  );

  const loc = window.location.pathname;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_GET_ALL_PRODUCT_URL,
          {
            params: {
              page: 1,
              size: process.env.REACT_APP_PRODUCT_LIMIT,
            },
          }
        );

        setAllProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  console.log(productPage);
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_GET_ALL_PRODUCT_URL,
        {
          params: {
            page: productPage,
            size: process.env.REACT_APP_PRODUCT_LIMIT,
          },
        }
      );
      return data.products;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const products = await fetchProducts();
    setAllProducts([...allProducts, ...products]);

    if (products.length === 0 || products.length < 15) {
      setHasMore(false);
    }

    setProductPage(productPage + 1);

    if (loc.includes("/products")) {
      setProductPage(productPage);
    }
  };

  console.log(allProducts);
  // useEffect(() => {
  //   if (productPage <= total) {
  //     GetAllProducts();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (total === productPage) {
  //     setHasMore(false);
  //   }
  // }, [productPage]);

  return (
    <>
      <InfiniteScroll
        dataLength={allProducts.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<SkeletonLoader />}
        endMessage={<h1>end</h1>}
      >
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
      </InfiniteScroll>
    </>
  );
};

export default GridLayout;
