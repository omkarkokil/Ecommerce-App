import * as React from "react";

import StateContext from "../../../Context/hooks/StateContext";
import Check1 from "./CheckoutStpes/Check1";

import Check2 from "./CheckoutStpes/Check2";
import Check3 from "./CheckoutStpes/Check3";
import LoginLoader from "../../../utils/LoginLoader";

const CheckLevels = () => {
  const { activeStep, isLoading } = React.useContext(StateContext);
  return (
    <>
      {isLoading ? (
        <LoginLoader />
      ) : activeStep === 0 ? (
        <Check1 />
      ) : activeStep === 1 ? (
        <Check2 />
      ) : (
        <Check3 />
      )}
    </>
  );
};

export default CheckLevels;
