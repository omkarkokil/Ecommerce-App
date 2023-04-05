import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

import StateContext from "../../Context/hooks/StateContext";
import CheckLevels from "./CheckLevels";

const steps = [
  "Select delivery address",
  "Confirm your order",
  "Select payment method",
];

export default function HorizontalLinearStepper() {
  const { activeStep, setActiveStep, skipped, setSkipped } =
    React.useContext(StateContext);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stack width={"100%"} mt="5%" justifyContent="center" alignItems={"center"}>
      <Box sx={{ width: "80%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <React.Fragment>
          <CheckLevels />
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
  );
}
