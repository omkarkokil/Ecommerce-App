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

  // all users
  const [AllUserData, setAllUserData] = useState([]);
  const [userCount, setUserCount] = useState();

  const [googleUser, setGoogleUser] = useState({});

  const [imageArr, setImageArr] = useState([]);
  const [activePage, setActivePage] = useState(1);
  // all users

  // products

  const [product, setProduct] = useState({
    name: "",
    desc: "",
    price: "",
    stock: "",
  });

  const [allProducts, setAllProducts] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [productImg, setproductImg] = useState([]);
  const [productPage, setProductPage] = useState(0);
  const [productCount, setProductCount] = useState();

  // products

  // comments

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState([]);
  // comments
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
        imageArr,
        setImageArr,
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading,
        googleUser,
        setGoogleUser,
        AllUserData,
        setAllUserData,
        userCount,
        setUserCount,
        activePage,
        setActivePage,
        product,
        setProduct,
        allProducts,
        setAllProducts,
        getProduct,
        productImg,
        setproductImg,
        setGetProduct,
        productPage,
        setProductPage,
        productCount,
        setProductCount,

        // comments

        comment,
        setComment,
        rating,
        setRating,
        comments,
        setComments,

        // comments
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
