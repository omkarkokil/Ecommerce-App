import { CircularProgress, Grid, Stack } from "@mui/material";
import { Box } from "@mui/material";

import React, { useContext, useEffect } from "react";
import ProductCard from "./ProductCard";
import StateContext from "../../../Context/hooks/StateContext";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "../../../utils/SkeletonLoader";
import axios from "axios";
import ApiContext from "../../../Context/Api/ApiContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FunctionContext from "../../../Context/Function/FunctionContext";

const GridLayout = () => {
  const {
    allProducts,
    productPage,
    setIsLoading,
    setAllProducts,
    isLoading,
    hasMore,
    search,
    setHasMore,
    setProductPage,
    setProductCount,
    productCount,
  } = useContext(StateContext);

  const { getProducts } = useContext(ApiContext);
  const { handleFilter } = useContext(FunctionContext);
  const { id } = useParams();

  useEffect(() => {
    setProductPage(2);
    getProducts(id);
    setHasMore(true);
  }, [window.location.pathname]);

  const fetchData = async () => {
    try {
      if (productPage > 0) {
        const { data } = await axios.get(
          process.env.REACT_APP_GET_ALL_PRODUCT_URL,
          {
            params: {
              page: productPage,
              size: process.env.REACT_APP_PRODUCT_LIMIT,
              search: id,
            },
          }
        );

        setAllProducts((allProducts) => [...allProducts, ...data.products]);
        // handleFilter(allProducts);
        setProductPage((productPage) => productPage + 1);
        if (data.products.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <Stack height={"100vh"}>
          <Stack position={"relative"}>
            <Grid
              container
              id="grid1"
              justifyContent={"center"}
              alignItems={"center"}
              rowSpacing={1}
              position={"absolute"}
              background="red"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item md={10} id="grid2">
                <InfiniteScroll
                  dataLength={allProducts.length}
                  next={fetchData}
                  hasMore={hasMore}
                  loader={
                    allProducts.length === 0 ? (
                      ""
                    ) : (
                      <Stack
                        sx={{ overflow: "hidden", alignItems: "center" }}
                        marginY={"20px"}
                      >
                        <CircularProgress />
                      </Stack>
                    )
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  <Box
                    id="gridBox"
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
                </InfiniteScroll>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default GridLayout;
