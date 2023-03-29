import React, { useContext } from "react";
import StateContext from "../hooks/StateContext";
import FunctionContext from "./FunctionContext";

const FunctionProvider = ({ children }) => {
  const { setOpen } = useContext(StateContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <FunctionContext.Provider value={{ handleOpen, handleClose }}>
      {children}
    </FunctionContext.Provider>
  );
};

export default FunctionProvider;
