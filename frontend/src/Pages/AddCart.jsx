import { Typography, Button, Divider } from "@mui/material";
import { Box, Stack } from "@mui/system";
import jacket from "../img/jakets.jpg";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import boat from "../img/boat.jpg";
import laptop from "../img/hp laptop.jpg";

const AddCart = () => {
  const [qty, setQty] = React.useState("");

  const handleChange = (event) => {
    setQty(event.target.value);
  };

  let menuItems = [];

  for (let i = 1; i <= 10; i++) {
    menuItems.push(
      <MenuItem value={i} key={i}>
        {i}
      </MenuItem>
    );
  }

  const arr = [
    {
      img: jacket,
      data: "Red jacket for men",
      price: " 32000",
    },
    {
      img: laptop,
      data: "HP pavilion 800",
      price: " 40000",
    },
    {
      img: boat,
      data: "Boat 450 headphones",
      price: " 999",
    },
  ];

  return (
    <>
      <Stack direction={"row"}>
        <Stack my={"10vh"} width={"70%"} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              background: "#000",
              color: "#fff",
              width: "85%",
              p: "10px",
              boxShadow: "0 0 3px #777",
              my: "10px",
            }}
          >
            <Typography variant="h6" className="obitron">
              YOUR CART
            </Typography>
          </Box>

          {arr.map((ele, id) => {
            return (
              <Stack width={"85%"}>
                <Stack direction={"row"}>
                  <Stack
                    alignItems={"center"}
                    justifyContent="center"
                    width={"40%"}
                  >
                    <img src={ele.img} style={{ width: "175px" }} alt="" />
                  </Stack>
                  <Stack width={"-webkit-fill-available"} ml={"10px"} mt="10px">
                    <Stack direction={"row"} justifyContent="space-between">
                      <Typography variant="h5">{ele.data}</Typography>
                      <Typography variant="h6"> &#8377; {ele.price}</Typography>
                    </Stack>
                    <Stack my={"5px"}>
                      <Typography variant="body2" color="initial">
                        Available in stock
                      </Typography>
                    </Stack>
                    <Box sx={{ width: "120px", my: "10px" }}>
                      <FormControl fullWidth variant="filled" size="small">
                        <InputLabel id="demo-simple-select-label">
                          Qty
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={qty}
                          label="Qty"
                          onChange={handleChange}
                        >
                          {menuItems}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box width={"120px"} my="10px">
                      <Button variant="contained" color="error">
                        Remove
                      </Button>
                    </Box>
                  </Stack>
                </Stack>

                <Box width={"100%"}>
                  <Divider />
                </Box>
              </Stack>
            );
          })}
        </Stack>
        <Stack width={"40%"}></Stack>
      </Stack>
    </>
  );
};

export default AddCart;
