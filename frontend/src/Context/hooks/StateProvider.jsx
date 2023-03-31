import React, { useState } from "react";
import StateContext from "./StateContext";

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  return (
    <StateContext.Provider
      value={{
        isLogin,
        setIsLogin,
        open,
        setOpen,
        activeStep,
        setActiveStep,
        skipped,
        setSkipped,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
