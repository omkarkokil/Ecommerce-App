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
} from "@mui/material";
import StateContext from "../../Context/hooks/StateContext";
import FunctionContext from "../../Context/Function/FunctionContext";
import ApiContext from "../../Context/Api/ApiContext";

const AdminProduct = () => {
  const { category, product, setProduct, isLoading } = useContext(StateContext);
  const { handleCategory, postDetailes, handleProducts } =
    useContext(FunctionContext);
  const { CreateProduct } = useContext(ApiContext);
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
      <Stack height={"100vh"} alignItems="center" justifyContent={"center"}>
        <Typography variant="h5" textAlign={"center"} className="obitron">
          ADD PRODUCT
        </Typography>
        <Stack>
          <FormControl margin="dense">
            <TextField
              id="product"
              margin="dense"
              sx={{ backgroundColor: "#fff", width: "400px", mr: "20px" }}
              placeholder="Product Name"
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
            <TextField
              id="price"
              type="number"
              margin="dense"
              sx={{ backgroundColor: "#fff", width: "400px" }}
              placeholder="Price"
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

          <FormControl margin="dense">
            <TextField
              id="decs"
              size="medium"
              sx={{
                backgroundColor: "#fff",
                width: "400px",
                width: "400px",
                mr: "20px",
              }}
              placeholder={"Product Description"}
              name="desc"
              value={product.desc}
              onChange={handleProducts}
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Box width={"400px"} my={"10px"}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Age"
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

          <FormControl margin="dense">
            <TextField
              id=""
              size="medium"
              sx={{ backgroundColor: "#fff", width: "400px", mr: "20px" }}
              placeholder={"In Stocks"}
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

          <FormControl margin="dense">
            <TextField
              size="medium"
              id="imageArr"
              type="file"
              accept="image/*"
              onChange={(e) => postDetailes(e.target.files)}
              sx={{ backgroundColor: "#fff", width: "400px", mr: "20px" }}
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
          </FormControl>

          <FormControl margin="dense">
            <Button
              variant="contained"
              size="medium"
              disabled={isLoading ? true : false}
              onClick={CreateProduct}
              sx={{ width: "40%" }}
              color="primary"
            >
              {isLoading ? "Loading..." : "Add Product"}
            </Button>
          </FormControl>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminProduct;
