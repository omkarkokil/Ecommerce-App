import React, { useContext } from "react";
import StateContext from "../hooks/StateContext";
import FunctionContext from "./FunctionContext";

const FunctionProvider = ({ children }) => {
  const { setOpen, setCategory, setValue } = useContext(StateContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleValue = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FunctionContext.Provider
      value={{ handleOpen, handleClose, handleCategory, handleValue }}
    >
      {children}
    </FunctionContext.Provider>
  );
};

export default FunctionProvider;
