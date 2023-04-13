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

const GridLayout = () => {
  const { GetAllProducts } = useContext(ApiContext);
  const { totalPagesCalculator } = useContext(FunctionContext);
  const { allProducts, productPage, productCount, setProductPage } =
    useContext(StateContext);

  const [hasMore, setHasMore] = useState(true);
  let total = totalPagesCalculator(
    productCount,
    process.env.REACT_APP_PRODUCT_LIMIT
  ).length;

  console.log(productPage <= total);

  useEffect(() => {
    if (productPage <= total) {
      GetAllProducts();
    }
  }, []);

  useEffect(() => {
    if (total === productPage) {
      setHasMore(false);
    }
  }, [productPage]);

  return (
    <>
      <InfiniteScroll
        dataLength={allProducts.length}
        next={GetAllProducts}
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
