import React, { useState } from "react";
import StateContext from "./StateContext";

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [category, setCategory] = React.useState("");
  const [value, setValue] = React.useState([0, 100000]);
  const [isAdmin, setIsAdmin] = useState(false);

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
        category,
        setCategory,
        value,
        setValue,
        isAdmin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
