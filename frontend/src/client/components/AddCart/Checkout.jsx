import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

import StateContext from "../../../Context/hooks/StateContext";
import CheckLevels from "./CheckLevels";
import Navbar from "../../../utils/Navbar";
import Check1 from "./CheckoutStpes/Check1";
import Check2 from "./CheckoutStpes/Check2";
import Check3 from "./CheckoutStpes/Check3";
import { StepContent } from "@mui/material";

const steps = [
  {
    label: "Select delivery address",
    content: <Check1 />,
  },
  {
    label: "Confirm your order",
    content: <Check2 />,
  },
  {
    label: "Select payment method",
    content: <Check3 />,
  },
];

export default function HorizontalLinearStepper() {
  const { activeStep, setActiveStep, skipped, setSkipped } =
    React.useContext(StateContext);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <>
      <Navbar />
      <Stack
        width={"100%"}
        mt={{ md: "5%", xs: "100px" }}
        justifyContent="center"
        alignItems={"center"}
      >
        <Box width={{ md: "80%", xs: "90%" }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((steps, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{steps.label}</StepLabel>
                  <StepContent>{steps.content}</StepContent>
                </Step>
              );
            })}
          </Stepper>

          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        </Box>
      </Stack>
    </>
  );
}
