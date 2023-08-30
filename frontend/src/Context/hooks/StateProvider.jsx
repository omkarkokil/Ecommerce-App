import React, { useRef, useState } from "react";
import StateContext from "./StateContext";
import { useTheme } from "@mui/material";

const StateProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [category, setCategory] = React.useState("");
  const [value, setValue] = React.useState([0, 500000]);
  const [filterRating, setFilterRating] = useState();
  const [search, setSearch] = useState("");
  const [FilterData, setFilterData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [componantLoading, setComponantLoading] = useState(false);

  // * Login & Register

  const [isLogin, setIsLogin] = useState(false);
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
    isAdmin: "",
    createdAt: "",
  });

  // ! Login & Register

  //  * all users
  const [AllUserData, setAllUserData] = useState([]);
  const [userCount, setUserCount] = useState();
  const [googleUser, setGoogleUser] = useState({});
  const [imageArr, setImageArr] = useState([]);
  const [activePage, setActivePage] = useState(1);

  // ! all users

  // ? products
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [makeProductImage, setmakeProductImage] = useState([]);

  const [productDesc, setProductDesc] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [productImg, setproductImg] = useState([]);
  const [productPage, setProductPage] = useState(2);
  const [productCount, setProductCount] = useState();
  const [isAdmin, setisAdmin] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [Inventory, setInventory] = useState(0);

  // ! products

  // ? comments

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState([]);

  // ! comments

  //? Cart items
  const [qty, setQty] = useState(1);
  const [cartItem, setCartItem] = useState([]);
  const [cartCount, setCartCount] = useState();
  //! Cart items

  //? handle Orders
  const [orderData, setOrderData] = useState({
    address: "",
    mob: "",
    pincode: "",
    State: "",
  });

  const [productPrices, setProductPrices] = useState({});

  const [orderProducts, setOrderProducts] = useState([]);

  const [allOrders, setAllOrders] = useState([]);
  const [allOrdersCount, setAllOrdersCount] = useState();

  const [earnings, setEarnings] = useState(0);

  const [totalCategoryBuy, setTotalCategoryBuy] = useState([]);

  const [myOrders, setmyOrders] = useState([]);

  const [topPurchaseProduct, setTopPurchaseProduct] = useState([]);

  const [UserImages, setUserImages] = useState([]);

  const [Order, setOrder] = useState(null);

  const theme = useTheme();

  //! handle Orders

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
        FilterData,
        setFilterData,

        componantLoading,
        setComponantLoading,

        filterRating,
        setFilterRating,
        // ?Login Register
        isLogin,
        setIsLogin,
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
        isAdmin,
        setisAdmin,
        UserImages,
        setUserImages,
        // ? Login Register

        //? products
        product,
        setProduct,
        allProducts,
        setAllProducts,
        productDesc,
        setProductDesc,
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
        makeProductImage,
        setmakeProductImage,
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
        myOrders,
        setmyOrders,
        allOrders,
        setAllOrders,
        allOrdersCount,
        setAllOrdersCount,
        earnings,
        setEarnings,
        totalCategoryBuy,
        setTotalCategoryBuy,
        Inventory,
        setInventory,
        topPurchaseProduct,
        setTopPurchaseProduct,
        theme,
        Order,
        setOrder,
        //! Order Data
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
