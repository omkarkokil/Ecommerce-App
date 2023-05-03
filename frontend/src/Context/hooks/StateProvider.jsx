import React, { useRef, useState } from "react";
import StateContext from "./StateContext";

const StateProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [category, setCategory] = React.useState("");
  const [value, setValue] = React.useState([0, 100000]);
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // * Login & Register

  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    password: "",
    Cpassword: "",
    email: "",
  });

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    id: "",
    userpic: "",
    isAdmin: 0,
  });

  // ! Login & Register

  //  * all users
  const [AllUserData, setAllUserData] = useState([]);
  const [userCount, setUserCount] = useState();
  const [googleUser, setGoogleUser] = useState({});
  const [imageArr, setImageArr] = useState([]);
  const [activePage, setActivePage] = useState(1);

  // ! all users

  /* -------------------------------------------------------------------------- */
  /*                                // ? products                               */
  /* -------------------------------------------------------------------------- */
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    price: "",
    stock: "",
  });
  const [allProducts, setAllProducts] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [productImg, setproductImg] = useState([]);
  const [productPage, setProductPage] = useState(2);
  const [productCount, setProductCount] = useState();
  const [hasMore, setHasMore] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                                // ! products                               */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                // ? comments                               */
  /* -------------------------------------------------------------------------- */

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState([]);

  /* -------------------------------------------------------------------------- */
  /*                                // ! comments                               */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                              //TODO Cart items                             */
  /* -------------------------------------------------------------------------- */
  const [qty, setQty] = useState(1);
  const [cartItem, setCartItem] = useState([]);
  const [cartCount, setCartCount] = useState();
  // ? Cart items

  /* -------------------------------------------------------------------------- */
  /*                               handle Orders                                */
  /* -------------------------------------------------------------------------- */

  const [orderData, setOrderData] = useState({
    address: "",
    mob: "",
    pincode: "",
    State: "",
  });

  const [productPrices, setProductPrices] = useState({});

  const [orderProducts, setOrderProducts] = useState([]);

  return (
    <StateContext.Provider
      value={{
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
        search,
        setSearch,

        // ?Login Register
        isLogin,
        setIsLogin,
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
        // ? Login Register

        //? products
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
        hasMore,
        setHasMore,
        //! products

        // ?comments
        comment,
        setComment,
        rating,
        setRating,
        comments,
        setComments,
        cartCount,
        setCartCount,
        // !comments

        //? cart
        qty,
        setQty,
        cartItem,
        setCartItem,
        //! cart

        //? Order Data
        orderData,
        setOrderData,
        orderProducts,
        setOrderProducts,
        productPrices,
        setProductPrices,
        //! Order Data
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
