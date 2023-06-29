import { CircularProgress, Grid, Stack } from "@mui/material";
import { Box } from "@mui/material";

import React, { Suspense, lazy, useContext, useEffect } from "react";
// import ProductCard from "./ProductCard";
import StateContext from "../../../Context/hooks/StateContext";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "../../../utils/SkeletonLoader";
import axios from "axios";
import ApiContext from "../../../Context/Api/ApiContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FunctionContext from "../../../Context/Function/FunctionContext";

const ProductCard = lazy(() => import("./ProductCard"));

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
    theme,
  } = useContext(StateContext);

  const { getProducts } = useContext(ApiContext);
  const { category, value, filterRating } = useContext(StateContext);
  const { id } = useParams();

  useEffect(() => {
    setProductPage(2);
    getProducts(id);
    setHasMore(true);
  }, [window.location.pathname, id]);

  const fetchData = async () => {
    try {
      if (productPage > 0) {
        const { data } = await axios.get(
          process.env.REACT_APP_GET_ALL_PRODUCT_URL,
          {
            params: {
              page: productPage,
              search: id,
            },
          }
        );

        setAllProducts((allProducts) => [...allProducts, ...data.products]);

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
      <Stack height={"100vh"}>
        <Stack position={"relative"}>
          <Grid
            container
            id="grid1"
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            rowSpacing={1}
            position={"absolute"}
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
                    [theme.breakpoints.up("xs")]: {
                      justifyContent: "center",
                    },
                    [theme.breakpoints.up("md")]: {
                      justifyContent: "flex-start",
                    },
                    height: "max-content",
                    marginTop: "30px",
                  }}
                >
                  {allProducts
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
                        <Suspense key={id} fallback={<SkeletonLoader />}>
                          <ProductCard items={items} />
                        </Suspense>
                      );
                    })}
                </Box>
              </InfiniteScroll>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};

export default GridLayout;
