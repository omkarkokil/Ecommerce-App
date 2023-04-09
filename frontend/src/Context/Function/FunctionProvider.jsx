import React, { useContext, useEffect } from "react";
import StateContext from "../hooks/StateContext";
import FunctionContext from "./FunctionContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const FunctionProvider = ({ children }) => {
  const {
    setOpen,
    setCategory,
    setValue,
    user,
    setUser,
    userPic,
    setUserPic,
    currentUser,
    setIsLoading,
  } = useContext(StateContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleValue = (event, newValue) => {
    setValue(newValue);
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser(() => {
      return {
        ...user,
        [name]: value,
      };
    });
  };

  const postDetailes = (pic) => {
    setIsLoading(true);
    if (pic === undefined) {
      console.log("select img");
    }
    if (
      pic.type === "image/jpg" ||
      pic.type === "image/jpeg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "collage-app");
      data.append("cloud_name", "dfxyr6c40");

      fetch("https://api.cloudinary.com/v1_1/dfxyr6c40/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserPic(data.url.toString());
          setIsLoading(false);

          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("err");
    }
  };

  const totalPagesCalculator = (total, limit) => {
    const pages = [];
    for (let x = 0; x < (parseInt(total) - 1) / limit; x++) {
      pages.push(x);
    }
    console.log(pages, parseInt(total));

    return pages;
  };

  return (
    <>
      <FunctionContext.Provider
        value={{
          handleOpen,
          handleClose,
          handleCategory,
          handleValue,
          handleUser,
          postDetailes,
          totalPagesCalculator,
        }}
      >
        {children}
      </FunctionContext.Provider>
    </>
  );
};

export default FunctionProvider;
