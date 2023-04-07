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

  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    id: "",
    userpic: "",
    isAdmin: 0,
  });

  // Register States
  const [user, setUser] = useState({
    name: "",
    password: "",
    Cpassword: "",
    email: "",
  });

  const [googleUser, setGoogleUser] = useState({});

  const [userPic, setUserPic] = useState();

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
        setIsAdmin,
        user,
        setUser,
        userPic,
        setUserPic,
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading,
        googleUser,
        setGoogleUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
