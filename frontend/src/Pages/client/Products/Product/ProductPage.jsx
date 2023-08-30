import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";

import { Box, Divider, Rating, IconButton, Button, Paper } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import ReviewModal from "./Comment/ReviewModal";
import GridComment from "./Comment/GridComment";
import Navbar from "../../../../utils/Navbar/Navbar";
import { useContext } from "react";
import ApiContext from "../../../../Context/Api/ApiContext";
import StateContext from "../../../../Context/hooks/StateContext";
import { useParams } from "react-router-dom";
import LoginLoader from "../../../../utils/Loaders/LoginLoader";
import FunctionContext from "../../../../Context/Function/FunctionContext";
import MainLoader from "../../../../utils/Loaders/MainLoader";

const ProductPage = () => {
  const {
    getProduct,
    isLoading,
    productImg,
    componantLoading,
    comments,
    qty,
    theme,
  } = useContext(StateContext);
  const { decreaseQty, IncreaseQty } = useContext(FunctionContext);
  const { GetProduct, AddToCart } = useContext(ApiContext);
  const { id } = useParams("");
  const loc = window.location.pathname;
  useEffect(() => {
    GetProduct(id);
  }, [id]);

  return (
    <>
      <Navbar />
      {isLoading ? <LoginLoader /> : ""}
      {componantLoading ? (
        <MainLoader />
      ) : (
        <>
          {getProduct && (
            <Stack
              direction={{ md: "row", xs: "column" }}
              mt="5%"
              sx={{
                [theme.breakpoints.up("xs")]: {
                  alignItems: "center",
                },
                [theme.breakpoints.up("md")]: {
                  alignItems: "flex-start",
                },
              }}
            >
              <Stack
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    mt: "100px",
                    width: "100%",
                  },
                  [theme.breakpoints.up("md")]: {
                    mt: "5%",
                    width: "40%",
                    // height: "80vh",
                  },
                }}
              >
                <Carousel interval={3000} navButtonsAlwaysInvisible>
                  {getProduct.img?.map((element, id) => {
                    return (
                      <Stack
                        key={id}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Paper
                          src={element}
                          elevation={0}
                          sx={{
                            height: "300px",
                          }}
                          component={"img"}
                          alt="none"
                        />
                      </Stack>
                    );
                  })}
                </Carousel>
              </Stack>
              <Stack
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    width: "90%",
                    alignItems: "center",
                  },
                  [theme.breakpoints.up("md")]: {
                    width: "60%",
                    my: "100px",

                    alignItems: "flex-start",
                  },
                }}
              >
                <Stack width={"80%"}>
                  <Typography
                    variant="h5"
                    fontSize={"1.9em"}
                    color="initial"
                    sx={{
                      [theme.breakpoints.up("sm")]: {
                        fontSize: "1.3em",
                      },
                      [theme.breakpoints.up("xs")]: {
                        fontSize: "1.5em",
                      },
                      [theme.breakpoints.up("md")]: {
                        fontSize: "1.9em",
                      },
                    }}
                  >
                    {getProduct.name}
                  </Typography>
                  <Stack
                    direction={"row"}
                    // width={"80%"}
                    mb="10px"
                    alignItems="flex-end"
                  >
                    <Rating
                      size="medium"
                      sx={{ mt: "10px" }}
                      readOnly
                      precision={0.1}
                      value={getProduct.avgrate}
                    />
                    <Typography variant="body1" color="initial" ml={"10px"}>
                      {comments.length === 0 ? "No" : comments.length} reviews
                    </Typography>
                  </Stack>

                  <Typography variant="h5" color="initial">
                    {" "}
                    &#8377;{getProduct.price}
                  </Typography>
                  {getProduct.stock <= 0 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: "red", my: "10px" }}
                    >
                      Status : Out of Stocks
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{ color: "green", my: "10px" }}
                    >
                      Status : InStock
                    </Typography>
                  )}
                  <Box width={"80%"} my="10px">
                    <Divider />
                  </Box>
                  <Stack direction="row" alignItems={"center"}>
                    <Stack direction="row" alignItems={"center"} mr="10px">
                      <IconButton
                        onClick={decreaseQty}
                        color="error"
                        disabled={getProduct.stock <= 0 ? true : false}
                      >
                        <Remove />
                      </IconButton>
                      <Typography variant="body1" mx={"10px"} color="initial">
                        {qty}
                      </Typography>
                      <IconButton
                        onClick={() => IncreaseQty(getProduct.stock)}
                        disabled={getProduct.stock <= 0 ? true : false}
                        color="success"
                      >
                        <Add />
                      </IconButton>
                    </Stack>
                    <Button
                      variant="contained"
                      onClick={() => AddToCart(getProduct._id)}
                      color="primary"
                      disabled={getProduct.stock <= 0 ? true : false}
                    >
                      Add to cart
                    </Button>
                  </Stack>
                  <Box width={"80%"} my="10px">
                    <Divider />
                  </Box>
                  <Box
                    mt={"20px"}
                    lineHeight={1.5}
                    fontSize={".8em"}
                    color={"initial"}
                    dangerouslySetInnerHTML={{ __html: getProduct.desc }}
                  ></Box>
                  <ReviewModal />
                </Stack>
              </Stack>
            </Stack>
          )}
          <GridComment />
        </>
      )}
    </>
  );
};

export default ProductPage;
