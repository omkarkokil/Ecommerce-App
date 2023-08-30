import { Category, PriceChange, Storage } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import StateContext from "../../../../../Context/hooks/StateContext";
import FunctionContext from "../../../../../Context/Function/FunctionContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ApiContext from "../../../../../Context/Api/ApiContext";
import { useParams } from "react-router-dom";
import LoginLoader from "../../../../../utils/Loaders/LoginLoader";

const EditProduct = () => {
  const { category, productImg } = useContext(StateContext);
  const { handleCategory } = useContext(FunctionContext);
  const { GetProduct } = useContext(ApiContext);

  const { id } = useParams("");

  useEffect(() => {
    GetProduct(id);
  }, []);

  const Items = [
    "Top",
    "Bottom",
    "attire",
    "Appliances",
    "electronics",
    "Laptop & tech",
  ];

  const {
    product,
    setProductDesc,
    productDesc,
    makeProductImage,
    isLoading,
    theme,
  } = useContext(StateContext);
  const { handleProducts, handleProductImage } = useContext(FunctionContext);
  const { postDetailes, editProduct } = useContext(ApiContext);

  const ref = useRef("");

  const pics = Array.from(makeProductImage);

  return (
    <>
      {isLoading ? <LoginLoader /> : ""}
      <Stack
        height={"100vh"}
        my={{ md: "50px" }}
        mt={{ xs: "70px" }}
        alignItems="center"
      >
        <Stack width={"80%"}>
          <Typography variant="h4" my={"20px"} fontSize={"1.8em"}>
            Edit Product
          </Typography>

          <Stack direction={{ md: "row", xs: "column" }}>
            <FormControl margin="dense">
              <FormLabel sx={{ color: "#333" }}>Enter Product Name </FormLabel>
              <TextField
                id="product"
                margin="dense"
                sx={{
                  backgroundColor: "#fff",
                  [theme.breakpoints.up("xs")]: {
                    width: "420px",
                  },

                  [theme.breakpoints.up("md")]: {
                    width: "500px",
                  },
                  mr: "20px",
                }}
                name="name"
                value={product.name}
                onChange={handleProducts}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Category />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl margin="dense">
              <FormLabel sx={{ color: "#333" }}>Enter Product Price </FormLabel>
              <TextField
                id="price"
                type="number"
                margin="dense"
                sx={{
                  backgroundColor: "#fff",
                  [theme.breakpoints.up("xs")]: {
                    width: "420px",
                  },

                  [theme.breakpoints.up("md")]: {
                    width: "500px",
                  },
                }}
                name="price"
                value={product.price}
                onChange={handleProducts}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PriceChange />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Stack>

          <Stack direction={{ md: "row", xs: "column" }}>
            <FormControl margin="dense">
              <FormLabel sx={{ color: "#333" }}>Enter total Stocks </FormLabel>
              <TextField
                id=""
                size="medium"
                sx={{
                  backgroundColor: "#fff",
                  backgroundColor: "#fff",
                  mr: "20px",
                  [theme.breakpoints.up("xs")]: {
                    width: "420px",
                  },

                  [theme.breakpoints.up("md")]: {
                    width: "500px",
                  },
                }}
                value={product.stock}
                onChange={handleProducts}
                name="stock"
                type="number"
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Storage />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Box>
              <FormControl
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    width: "420px",
                  },

                  [theme.breakpoints.up("md")]: {
                    width: "500px",
                  },
                }}
                fulWidth
                margin="dense"
              >
                <FormLabel sx={{ color: "#333" }}>Enter Category</FormLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  sx={{ my: "8px" }}
                  onChange={handleCategory}
                >
                  {Items.map((ele, id) => {
                    return (
                      <MenuItem key={id} value={ele}>
                        {ele}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Stack>

          <Stack
            sx={{
              height: "250px",
              [theme.breakpoints.up("xs")]: {
                width: "400px",
              },
              [theme.breakpoints.up("sm")]: {
                width: "610px",
              },
              [theme.breakpoints.up("md")]: {
                width: "810px",
              },
              [theme.breakpoints.up("lg")]: {
                width: "1010px",
              },
            }}
          >
            <FormControl margin="dense">
              <FormLabel sx={{ color: "#333", mb: "5px" }}>
                Enter product Description
              </FormLabel>
              <ReactQuill
                theme="snow"
                style={{ height: "30vh", width: "100%" }}
                value={productDesc}
                onChange={setProductDesc}
              />
            </FormControl>
          </Stack>

          <Stack mt={{ md: "50px", xs: "130px" }}>
            <FormControl margin="dense">
              <FormLabel sx={{ color: "#333" }}>Upload Images</FormLabel>
              <TextField
                size="medium"
                id="imageArr"
                type="file"
                onChange={handleProductImage}
                sx={{
                  backgroundColor: "#fff",
                  [theme.breakpoints.up("xs")]: {
                    width: "420px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    width: "600px",
                  },
                  [theme.breakpoints.up("md")]: {
                    width: "1010px",
                  },

                  mr: "20px",
                }}
                margin="dense"
                inputProps={{
                  multiple: true,
                  accept: "image/jpeg, image/png",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Storage />
                    </InputAdornment>
                  ),
                }}
              />
              <small style={{ color: "red" }}>
                * We recommend to upload less than 5 images
              </small>
            </FormControl>
          </Stack>

          <Stack direction={"row"}>
            {makeProductImage.length === 0
              ? productImg &&
                productImg?.map((ele, i) => {
                  return (
                    <img
                      src={ele}
                      key={i}
                      height={"70px"}
                      width={"70px"}
                      style={{ margin: "0 5px" }}
                      alt="none"
                    />
                  );
                })
              : pics.map((ele, i) => {
                  return (
                    <img
                      src={URL.createObjectURL(ele)}
                      key={i}
                      height={"70px"}
                      width={"70px"}
                      style={{ margin: "0 5px" }}
                      alt="none"
                    />
                  );
                })}
          </Stack>
          <Stack my={"10px"}>
            <Button
              color="primary"
              size="small"
              onClick={() =>
                editProduct(id, () => postDetailes(makeProductImage))
              }
              variant="contained"
              sx={{ mb: "20px", width: "150px" }}
            >
              Edit Product
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default EditProduct;
