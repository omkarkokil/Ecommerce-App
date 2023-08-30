import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import {
  Category,
  Description,
  Email,
  Facebook,
  Google,
  Key,
  Person,
  PriceChange,
  Storage,
} from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  InputAdornment,
  FormControl,
  Button,
  Typography,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  LinearProgress,
  FormLabel,
} from "@mui/material";
import StateContext from "../../../../Context/hooks/StateContext";
import FunctionContext from "../../../../Context/Function/FunctionContext";
import ApiContext from "../../../../Context/Api/ApiContext";
import ReactQuill from "react-quill";
import LoginLoader from "../../../../utils/Loaders/LoginLoader";

const AdminProduct = () => {
  const {
    category,
    product,
    isLoading,
    makeProductImage,
    productDesc,
    setProductDesc,
    theme,
  } = useContext(StateContext);
  const { handleCategory, handleProducts, handleProductImage } =
    useContext(FunctionContext);
  const { CreateProduct, postDetailes, GetProduct } = useContext(ApiContext);

  const pics = Array.from(makeProductImage);

  const Items = [
    "Top",
    "Bottom",
    "attire",
    "Appliances",
    "electronics",
    "Laptop & tech",
  ];

  return (
    <>
      {isLoading ? <LoginLoader /> : ""}
      <Stack
        height={"100vh"}
        my={{ md: "50px" }}
        mt={{ xs: "70px" }}
        width={"100%"}
        alignItems="center"
      >
        <Stack width={{ md: "90%", lg: "80%" }}>
          <Typography variant="h4" my={"20px"} fontSize={"1.8em"}>
            Add Product
          </Typography>

          <Stack direction={{ md: "column", lg: "row" }}>
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
              <FormLabel sx={{ color: "#333" }}>Enter Product price </FormLabel>
              <TextField
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
                id="price"
                type="number"
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
                name="stock"
                type="number"
                value={product.stock}
                onChange={handleProducts}
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

            <Box width={"500px"}>
              <FormControl
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    width: "420px",
                  },

                  [theme.breakpoints.up("md")]: {
                    width: "500px",
                  },
                }}
                fullWidth
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
                width: "420px",
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
                name="desc"
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
                accept="image/*"
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
                placeholder={"In Stocks"}
                margin="dense"
                inputProps={{
                  multiple: true,
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
            {pics !== ""
              ? pics.map((ele, i) => {
                  return (
                    <img
                      src={URL.createObjectURL(ele)}
                      key={i}
                      height={"70px"}
                      width={"70px"}
                      style={{ margin: "0 5px" }}
                      alt=""
                    />
                  );
                })
              : ""}
          </Stack>

          <FormControl margin="dense">
            <Button
              variant="contained"
              size="small"
              onClick={() =>
                CreateProduct(() => postDetailes(makeProductImage))
              }
              sx={{ width: "150px" }}
              color="primary"
            >
              Add Product
            </Button>
          </FormControl>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminProduct;
