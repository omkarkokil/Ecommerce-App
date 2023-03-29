import React, { useState } from "react";
import StateContext from "./StateContext";

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [open, setOpen] = React.useState(false);

  return (
    <StateContext.Provider value={{ isLogin, setIsLogin, open, setOpen }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
