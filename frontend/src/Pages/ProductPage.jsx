import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";

import { Box, Divider, Rating, IconButton, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import ReviewModal from "../components/productpage/ReviewModal";
import GridComment from "../components/productpage/GridComment";
import Navbar from "../utils/Navbar";
import { useContext } from "react";
import ApiContext from "../Context/Api/ApiContext";
import StateContext from "../Context/hooks/StateContext";
import { useParams } from "react-router-dom";
import LoginLoader from "../utils/LoginLoader";

const ProductPage = () => {
  const { getProduct, isLoading, productImg } = useContext(StateContext);
  const { GetProduct } = useContext(ApiContext);
  const { id } = useParams("");
  const loc = window.location.pathname;
  useEffect(() => {
    GetProduct(id);
  }, [loc]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <LoginLoader />
      ) : (
        <>
          <Stack mt="5%" direction={"row"}>
            <Stack width={"40%"} height="80vh" justifyContent={"center"}>
              <Carousel interval={3000} navButtonsAlwaysInvisible>
                {productImg.map((element) => {
                  return (
                    <Stack
                      key={element}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <img src={element} width={"300px"} alt="" />
                    </Stack>
                  );
                })}
              </Carousel>
            </Stack>
            <Stack mt={"5%"} width={"60%"}>
              <Typography
                variant="h5"
                fontSize={"1.9em"}
                color="initial"
                width={"80%"}
              >
                {getProduct.name}
              </Typography>
              <Stack direction={"row"} mb="10px" alignItems="flex-end">
                <Rating size="medium" sx={{ mt: "10px" }} readOnly value={3} />
                <Typography variant="body1" color="initial" ml={"10px"}>
                  2 reviews
                </Typography>
              </Stack>
              <Typography variant="h5" color="initial">
                {" "}
                &#8377;{getProduct.price}
              </Typography>
              {getProduct.stock <= 0 ? (
                <Typography variant="body1" sx={{ color: "red", my: "10px" }}>
                  Status : Out of Stocks
                </Typography>
              ) : (
                <Typography variant="body1" sx={{ color: "green", my: "10px" }}>
                  Status : InStock
                </Typography>
              )}
              <Box width={"80%"} my="10px">
                <Divider />
              </Box>
              <Stack direction="row" alignItems={"center"} width={"60%"}>
                <Stack direction="row" alignItems={"center"} mr="10px">
                  <IconButton color="error">
                    <Remove />
                  </IconButton>
                  <Typography variant="body1" mx={"10px"} color="initial">
                    2
                  </Typography>
                  <IconButton color="success">
                    <Add />
                  </IconButton>
                </Stack>
                <Button variant="contained" color="primary">
                  Add to cart
                </Button>
              </Stack>
              <Box width={"80%"} my="10px">
                <Divider />
              </Box>
              <Box width={"80%"}>
                <Typography variant="body2" color="initial" my={"10px"}>
                  {getProduct.desc}
                </Typography>
              </Box>
              <Box width={"25%"}>
                <ReviewModal />
              </Box>
            </Stack>
          </Stack>
          <GridComment />
        </>
      )}
    </>
  );
};

export default ProductPage;
