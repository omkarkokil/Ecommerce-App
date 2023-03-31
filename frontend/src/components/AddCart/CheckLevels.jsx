import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Divider, FormControl, InputAdornment, TextField } from "@mui/material";
import {
  CreditCard,
  DateRange,
  Home,
  Key,
  LocationCity,
  Pin,
} from "@mui/icons-material";
import jacket from "../../img/jakets.jpg";
import boat from "../../img/boat.jpg";
import laptop from "../../img/hp laptop.jpg";
import Phone from "@mui/icons-material/Phone";
import StateContext from "../../Context/hooks/StateContext";

const CheckLevels = () => {
  const { skipped, setSkipped, activeStep, setActiveStep } =
    React.useContext(StateContext);
  const arr = [
    {
      img: jacket,
      data: "Red jacket for men",
      price: 32000,
      ind: "10",
      qty: 2,
    },
    {
      img: laptop,
      data: "HP pavilion 800",
      price: 40000,
      qty: 3,
    },
    {
      img: boat,
      data: "Boat 450 headphones",
      price: 999,
      qty: 1,
    },
  ];

  const result = arr.reduce(function (acc, obj) {
    return acc + obj.price * obj.qty;
  }, 0);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  return (
    <>
      {activeStep === 0 ? (
        <Stack sx={{ mt: "40px" }}>
          <Typography
            textAlign={"center"}
            variant="h5"
            // mb={"20px"}
            color="initial"
            className="obitron"
          >
            Enter your delivery address
          </Typography>

          <Stack justifyContent={"center"} alignItems="center">
            <FormControl margin="dense">
              <TextField
                id=""
                margin="dense"
                sx={{ backgroundColor: "#fff", width: "400px" }}
                placeholder="Enter your address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl margin="dense">
              <TextField
                id=""
                margin="dense"
                sx={{ backgroundColor: "#fff", width: "400px" }}
                placeholder="Enter your City name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl margin="dense">
              <TextField
                id=""
                size="medium"
                sx={{ backgroundColor: "#fff", width: "400px" }}
                placeholder={"Enter your contact number"}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl margin="dense">
              <TextField
                id=""
                size="medium"
                sx={{ backgroundColor: "#fff", width: "400px" }}
                placeholder={"Enter your pincode"}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Pin />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Box width="400px">
              <FormControl fullWidth margin="dense">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleNext}
                  size="medium"
                  color="primary"
                >
                  Continue
                </Button>
              </FormControl>
            </Box>
          </Stack>
        </Stack>
      ) : activeStep === 1 ? (
        <Stack mt={"30px"} direction={"row"}>
          <Stack width={"70%"} sx={{ alignItems: "center" }}>
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
                SHIPING INFO
              </Typography>
            </Box>
            <Stack width={"80%"}>
              <Typography variant="body1" color="initial">
                Name : Omkar sandip kokil
              </Typography>
              <Typography variant="body1" my={"5px"} color="initial">
                Phone : 1234567890
              </Typography>
              <Typography variant="body1" color="initial">
                Address : At post edli tal dosa dist samber
              </Typography>
            </Stack>
            <Box width={"80%"} my="10px">
              <Divider />
            </Box>
            <Stack width={"80%"}>
              <Typography
                variant="h5"
                className="obitron"
                my={"10px"}
                color="initial"
              >
                Your cart items
              </Typography>

              {arr.map((ele, id) => {
                return (
                  <Stack key={id} direction={"row"} my="10px">
                    <Stack width={"30%"}>
                      <img src={ele.img} style={{ width: "70px" }} alt="none" />
                    </Stack>
                    <Stack
                      direction={"row"}
                      width={"70%"}
                      justifyContent="space-between"
                      alignItems={"center"}
                    >
                      <Typography variant="body1" color="initial">
                        {ele.data}
                      </Typography>
                      <Typography variant="body1" color="initial">
                        {ele.qty} x &#8377;{ele.price} = &#8377;
                        {ele.qty * ele.price}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Stack width={"30%"} sx={{ alignItems: "center" }}>
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
                ORDER SUMMARY
              </Typography>
            </Box>
            <Stack
              direction={"row"}
              width={"85%"}
              justifyContent={"space-between"}
            >
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">&#8377; {result}</Typography>
            </Stack>
            <Stack
              direction={"row"}
              width={"85%"}
              my="20px"
              justifyContent={"space-between"}
            >
              <Typography variant="body1">Shiping charges</Typography>
              <Typography variant="body1">&#8377;40 </Typography>
            </Stack>
            <Stack
              direction={"row"}
              width={"85%"}
              justifyContent={"space-between"}
            >
              <Typography variant="body1">gst :</Typography>
              <Typography variant="body1">&#8377;0 </Typography>
            </Stack>
            <Box width={"85%"} my="15px">
              <Divider />
            </Box>
            <Stack
              direction={"row"}
              width={"85%"}
              justifyContent={"space-between"}
            >
              <Typography variant="body1">Total :</Typography>
              <Typography variant="body1">&#8377;250000 </Typography>
            </Stack>
            <Stack alignItems={"flex-end"} my="20px" width="85%">
              <Button
                variant="contained"
                sx={{ width: "max-content" }}
                color="primary"
                onClick={handleNext}
              >
                Proceed to payment
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack sx={{ mt: "40px" }}>
          <Typography
            textAlign={"center"}
            variant="h5"
            color="initial"
            className="obitron"
          >
            Enter your card details
          </Typography>

          <Stack justifyContent={"center"} alignItems="center">
            <FormControl margin="dense">
              <TextField
                id=""
                margin="dense"
                sx={{ backgroundColor: "#fff", width: "400px" }}
                placeholder="Enter Card number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCard />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl margin="dense">
              <TextField
                id=""
                size="medium"
                sx={{ backgroundColor: "#fff", width: "400px" }}
                placeholder={"Enter MM/YY"}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl margin="dense">
              <TextField
                id=""
                size="medium"
                sx={{ backgroundColor: "#fff", width: "400px" }}
                placeholder={"Enter your CVC"}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Key />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Box width="400px">
              <FormControl fullWidth margin="dense">
                <Button
                  fullWidth
                  variant="contained"
                  size="medium"
                  onClick={handleNext}
                  color="primary"
                >
                  Pay &#8377;54000
                </Button>
              </FormControl>
              <Divider sx={{ my: "10px" }} />
              <FormControl fullWidth margin="dense">
                <Button
                  fullWidth
                  variant="contained"
                  size="medium"
                  color="success"
                  onClick={handleNext}
                >
                  cash on delivery
                </Button>
              </FormControl>
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default CheckLevels;
