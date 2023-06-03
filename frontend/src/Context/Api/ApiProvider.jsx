import React, { useContext, useEffect } from "react";
import ApiContext from "./ApiContext";
import StateContext from "../hooks/StateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import FunctionContext from "../Function/FunctionContext";
import { Try } from "@mui/icons-material";

const ApiProvider = ({ children }) => {
  const {
    user,
    imageArr,
    currentUser,
    setCurrentUser,
    setIsLogin,
    AllUserData,
    setAllUserData,
    setUserCount,
    setIsLoading,
    activePage,
    setActivePage,
    product,
    category,
    setAllProducts,
    setProductCount,
    search,
    setSearch,
    getProduct,
    productImg,
    productPage,
    setproductImg,
    setGetProduct,
    setProductPage,
    allProducts,
    isLogin,
    // comment
    comment,
    rating,
    comments,
    setComments,
    // comment

    //TODO cart
    qty,
    cartItem,
    setCartItem,
    cartCount,
    setCartCount,
    //? cart

    // orderdata
    orderData,
    orderProducts,
    productPrices,
    myOrders,
    setmyOrders,

    // orderdata
  } = useContext(StateContext);

  const { handleCloseModal, handleNext } = useContext(FunctionContext);
  let loc = window.location.pathname;
  const navigate = useNavigate();

  const toastoption = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const token = localStorage.getItem("user");
      const decode = jwt_decode(token);
      const { id } = decode;

      setCurrentUser({
        name: id.name,
        email: id.email,
        userpic: id.userPic,
        id: id._id,
        isAdmin: id.isAdmin,
      });

      setIsLogin(true);
    }
  }, [localStorage.getItem("user")]);

  const logOut = () => {
    localStorage.clear();
    toast.success("Log out successfully", toastoption);
    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    if (loc.includes("/admin") && !localStorage.getItem("isAdmin")) {
      navigate("/");
    }
  }, []);

  const RegisterHandler = async () => {
    try {
      setIsLoading(true);
      const { name, email, password, Cpassword } = user;

      if (password !== Cpassword) {
        setIsLoading(false);
        toast.error(
          "password and confirmpassword are not matching",
          toastoption
        );

        return false;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/registeruser",
        { name, email, password, userPic: imageArr[0] },
        config
      );

      if (data.status === false) {
        setIsLoading(false);
        toast.error(data.msg, toastoption);
        return false;
      }
      if (data.status) {
        setIsLoading(false);
        toast.success(data.msg, toastoption);
        localStorage.setItem("user", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginhandler = async () => {
    try {
      setIsLoading(true);
      const { email, password } = user;

      if ((!email, !password)) {
        setIsLoading(false);
        toast.error("All fields are mandatory", toastoption);
        return false;
      }
      const { data } = await axios.post("/api/auth/loginuser", {
        email,
        password,
      });

      if (!data.status) {
        setIsLoading(false);
        toast.error(data.msg, toastoption);
        return false;
      }

      if (data.status) {
        setIsLoading(false);
        toast.success(data.msg, toastoption);
        localStorage.setItem("user", data.token);

        if (data.isAdminStatus) {
          localStorage.setItem("isAdmin", data.isAuth);
          navigate("/admin/dashboard");
        }

        if (!data.isAdminStatus) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        setIsLoading(true);
        await axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          })
          .then(async (credentials) => {
            const { name, email, picture, sub } = credentials.data;
            const { data } = await axios.post("/api/auth/googleAuth", {
              name,
              email,
              picture,
              sub,
            });

            if (data.status) {
              toast.success(data.msg, toastoption);
              localStorage.setItem("user", data.token);
              setIsLoading(false);

              if (data.isAdminStatus) {
                localStorage.setItem("isAdmin", data.isAuth);
                navigate("/admin/dashboard");
              }

              if (!data.isAdminStatus) {
                navigate("/");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const AllUsersData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_GET_ALL_USERS_URL}`,
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
          params: {
            page: activePage,
            size: process.env.REACT_APP_LIMIT,
          },
        }
      );

      if (data.status) {
        setAllUserData(data.users);
        setUserCount(data.total);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUser = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      };
      const { data } = await axios.delete(
        `${process.env.REACT_APP_DELETE_USER_URL}/${id}`,
        config
      );

      if (data.status) {
        toast.success(data.msg);
        AllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loc === "/admin/users") {
      AllUsersData();
    }
  }, [activePage, loc]);

  const CreateProduct = async () => {
    try {
      const { name, desc, stock, price } = product;

      const { data } = await axios.post(
        process.env.REACT_APP_CREATE_PRODUCT_URL,
        { name, desc, stock, price, img: imageArr, category }
      );

      if (data.status) {
        toast.success(data.msg, toastoption);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (id) => {
    // setProductPage((productPage) => productPage + 1);
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        process.env.REACT_APP_GET_ALL_PRODUCT_URL,
        {
          params: {
            page: 1,
            size: process.env.REACT_APP_PRODUCT_LIMIT,
            search: id,
          },
        }
      );

      if (data.total !== allProducts.length) {
        setAllProducts(data.products);
        setProductCount(data.total);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const GetProduct = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_GET_PRODUCT_URL}/${id}`
      );
      setGetProduct(data);
      setproductImg(data.img);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const GetComments = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GET_COMMENT_URL}/${id}`
      );

      setComments(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const makeComment = async (id) => {
    try {
      if (!localStorage.getItem("user")) {
        navigate("/login");
        return false;
      }
      const { data } = await axios.put(
        process.env.REACT_APP_CREATE_COMMENT_URL,
        {
          comment,
          rating,
          productid: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      if (data.status) {
        const arr = data.data.reviews;
        setComments(arr);
        toast.success(data.msg, toastoption);
      }
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  const AddToCart = async (id) => {
    try {
      if (!localStorage.getItem("user")) {
        navigate("/login");
        return false;
      }
      const { data } = await axios.post(
        process.env.REACT_APP_Add_TO_CART,
        {
          productid: id,
          qty,
        },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      if (data.status) {
        toast.success(data.msg, toastoption);
        GetCart();
        setCartCount(cartCount + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetCart = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(process.env.REACT_APP_GET_CART, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      });
      if (data.status) {
        setCartItem(data.cartProduct);
        setCartCount(data.cartProduct.length);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const RemoveCart = async (id) => {
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_REMOVE_FROM_CART,
        { id },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      if (data.status) {
        toast.success(data.msg, toastoption);
        const newData = cartItem.filter((item) => {
          return item.productid._id !== id;
        });

        setCartItem(newData);
        setCartCount(cartCount - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      GetCart();
    }
  }, [localStorage.getItem("user")]);

  //? Order data

  const makeOrder = async () => {
    try {
      const { totalPrice, taxPrice } = productPrices;
      const { State, address, mob, pincode } = orderData;
      const { data } = await axios.post(
        process.env.REACT_APP_MAKE_ORDER,
        {
          ShipingInfo: { State: State.name, address, mob, pincode },
          OrderData: orderProducts,
          totalPrice,
          taxPrice,
          PaymentType: "cash on delivery",
        },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      if (data.status) {
        toast.success(data.msg, toastoption);
        setCartItem([]);
        setCartCount(0);
        handleNext();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MyOrders = async () => {
    setIsLoading(true);
    const { data } = await axios.get(process.env.REACT_APP_MY_ORDERS, {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });

    setmyOrders(data);

    setIsLoading(false);
  };

  const OnlinePayment = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(process.env.REACT_APP_GET_KEY);

      const { totalPrice } = productPrices;
      console.log(totalPrice);

      const {
        data: { order },
      } = await axios.post(
        process.env.REACT_APP_ONLINE_CHECKOUT,
        {
          amount: totalPrice,
        },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      const { mob, address, pincode, State } = orderData;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "NSRAVAN",
        description: "ONESTOPSHOP",
        image:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        order_id: order.id,
        handler: async function (res) {
          setIsLoading(true);
          const { totalPrice, taxPrice } = productPrices;
          const { State, address, mob, pincode } = orderData;
          const { data } = await axios.post(
            process.env.REACT_APP_VERIFY_PAYMENT,
            {
              ShipingInfo: { State: State.name, address, mob, pincode },
              OrderData: orderProducts,
              totalPrice,
              taxPrice,
              PaymentType: "Paid",
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
            },
            {
              headers: {
                Authorization: localStorage.getItem("user"),
              },
            }
          );

          if (data.success) {
            toast.success(data.msg, toastoption);
            setCartItem([]);
            setCartCount(0);
            handleNext();
            navigate("/ordersSuccess");
            setIsLoading(false);
          } else {
            toast.msg("Some error occured", toastoption);
            setIsLoading(false);
          }
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
          contact: mob,
        },
        notes: {
          address,
        },
        theme: {
          color: "#1976d2",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };
  //? Order data

  return (
    <ApiContext.Provider
      value={{
        RegisterHandler,
        logOut,
        loginhandler,
        googleLogin,
        DeleteUser,
        AllUsersData,
        CreateProduct,
        GetProduct,
        makeComment,
        GetComments,
        getProducts,
        AddToCart,
        GetCart,
        RemoveCart,
        makeOrder,
        MyOrders,
        OnlinePayment,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
