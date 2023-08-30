import React, { useCallback, useContext, useEffect, useMemo } from "react";
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
  const img = [];
  const {
    setComponantLoading,
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
    setProduct,
    category,
    setAllProducts,
    setProductCount,
    setproductImg,
    setGetProduct,
    setCategory,
    allProducts,
    isLogin,
    productImg,
    productDesc,

    // comment
    comment,
    rating,
    comments,
    setComments,
    // comment

    //TODO cart
    qty,
    setQty,
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
    isAdmin,
    setisAdmin,
    setOrder,
    makeProductImage,
    setProductDesc,
    setImageArr,
    allOrders,
    setAllOrders,
    allOrdersCount,
    setAllOrdersCount,
    setEarnings,
    setTotalCategoryBuy,
    setInventory,
    setTopPurchaseProduct,
    isLoading,
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

  const logOut = () => {
    localStorage.clear();
    toast.success("Log out successfully", toastoption);
    setIsLogin(false);
    setisAdmin(false);
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const token = localStorage.getItem("user");
      const decode = jwt_decode(token);
      const { id } = decode;

      if (decode.id !== null) {
        setCurrentUser({
          name: id.name,
          email: id.email,
          userpic: id.userPic,
          id: id._id,
          isAdmin: id.isAdmin,
          createdAt: id.createdAt,
        });

        setIsLogin(true);

        const expirationTime = decode.exp * 1000;

        if (Date.now() > expirationTime) {
          logOut();
        }
      }
    }
  }, [loc, isLogin]);

  useEffect(() => {
    let tokenId;
    if (localStorage.getItem("isAdmin")) {
      const token = localStorage.getItem("isAdmin");
      const decode = jwt_decode(token);
      const { id } = decode;
      tokenId = id;
    }

    if (tokenId === 1) {
      setisAdmin(true);
      setIsLogin(true);
    }

    if (loc.includes("/admin") && tokenId !== 1) {
      navigate("/");
    }
  }, [loc, setIsLogin]);

  const RegisterHandler = async (CallBack) => {
    await CallBack();
    try {
      const string = img.toString();

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
        `${process.env.REACT_APP_REGISTER_URL}`,
        { name, email, password, userPic: string },
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
        setIsLogin(true);
        navigate("/");
      }
    } catch (error) {
      console.log("404 server error please try again", toastoption);
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
      const { data } = await axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
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

        if (data.isAdminStatus) {
          localStorage.setItem("isAdmin", data.isAuth);
          navigate("/");
        }
        toast.success(data.msg, toastoption);
        localStorage.setItem("user", data.token);

        navigate("/");
      }
    } catch (error) {
      console.log("404 server error please try again", toastoption);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        setIsLoading(true);
        await axios
          .get(`${process.env.REACT_APP_GOOGLE_VERIFY}`, {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          })
          .then(async (credentials) => {
            const { name, email, picture, sub } = credentials.data;
            const { data } = await axios.post(
              `${process.env.REACT_APP_GOOGLE_AUTH}`,
              {
                name,
                email,
                picture,
                sub,
              }
            );

            if (data.status) {
              toast.success(data.msg, toastoption);
              localStorage.setItem("user", data.token);
              setIsLogin(true);
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
        console.log("404 server error please try again", toastoption);
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
          },
        }
      );

      if (data.status) {
        setAllUserData(data.users);
        setUserCount(data.total);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("404 server error please try again", toastoption);
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
      console.log("404 server error please try again", toastoption);
    }
  };

  useEffect(() => {
    if (loc === "/admin/users" || loc === "/admin/dashboard") {
      AllUsersData();
    }
  }, [activePage, loc]);

  const postDetailes = async (pics) => {
    const pic = Array.from(pics);

    if (pic === undefined) {
      toast.warning("Please select an image");
    }

    try {
      const uploadPromises = pic.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "collage-app");
        formData.append("cloud_name", "dfxyr6c40");
        const response = await axios.post(
          `${process.env.REACT_APP_CLOUDINARY_URL}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        img.push(response.data.url);
      });
      await Promise.all(uploadPromises);
      setImageArr((CopyAll) => [...CopyAll, ...img]);
    } catch (error) {
      console.error("Error occurred during upload:", error);
    }
  };

  const CreateProduct = async (Callback) => {
    setIsLoading(true);
    await Callback();
    try {
      const { name, stock, price } = product;

      const { data } = await axios.post(
        process.env.REACT_APP_CREATE_PRODUCT_URL,
        { name, desc: productDesc, stock, price, img, category }
      );

      if (!name || !productDesc || !stock || !price || !category) {
        toast.error("All fields are mandatory", toastoption);

        setIsLoading(false);
        return false;
      }
      if (data.status) {
        toast.success(data.msg, toastoption);
        setIsLoading(false);
        img = [];
        setAllProducts((pre) => [...data.product, ...pre]);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("404 server error please try again", toastoption);
    }
    setCategory("");
  };

  const editProduct = async (id, Callback) => {
    setIsLoading(true);
    try {
      await Callback();
      const { name, stock, price } = product;

      const { data } = await axios.put(
        `${process.env.REACT_APP_UPDATE_PRODUCT_URL}/${id}`,
        {
          name,
          desc: productDesc,
          stock,
          price,
          img: makeProductImage.length <= 0 ? productImg : img,
          category,
        }
      );

      if (!name || !productDesc || !stock || !price || !category) {
        toast.error("All fields are mandatory", toastoption);
        setIsLoading(false);
        return false;
      }

      if (!data.success) {
        console.log(data.msg, toastoption);
        setIsLoading(false);
      }
      if (data.success) {
        toast.success(data.msg, toastoption);
        setIsLoading(false);
        navigate("/admin/products");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("404 server error please try again", toastoption);
    }
    setCategory("");
  };

  const getProducts = async (id) => {
    setIsLoading(true);
    try {
      setAllProducts([]);
      const { data } = await axios.get(
        process.env.REACT_APP_GET_ALL_PRODUCT_URL,
        {
          params: {
            page: loc.includes("/admin/products") ? activePage : 1,
            size: loc.includes("/admin/products") ? 10 : 15,
            search: id,
          },
        }
      );

      setAllProducts(data.products);
      setProductCount(data.total);
      setInventory(data.Inventory);
      setIsLoading(false);
    } catch (error) {
      console.log("404 server error please try again", toastoption);
    }
  };

  const GetProduct = async (id) => {
    setComponantLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GET_PRODUCT_URL}/${id}`
      );
      setGetProduct(data);

      setIsLoading(false);
      if (loc.includes("/admin/editProduct")) {
        setProduct({
          name: data.name,
          desc: data.desc,
          stock: data.stock,
          price: data.price,
        });
        setproductImg(data.img);
        setProductDesc(data.desc);
        setCategory(data.category);
      }
    } catch (error) {
      setComponantLoading(false);
      console.log("404 server error please try again", toastoption);
    }
    setComponantLoading(false);
  };

  const DeleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        process.env.REACT_APP_Delete_Product,
        {
          params: {
            id,
          },
        }
      );

      if (data.status === false) {
        toast.success(data.msg, toastoption);
      }
      if (data.status === true) {
        toast.success(data.msg, toastoption);
        if (loc.includes("/admin")) {
          getProducts();
        }
      }
    } catch (error) {
      console.log("404 server error", toastoption);
      console.log("404 server error please try again", toastoption);
    }
  };

  const GetComments = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GET_COMMENT_URL}/${id}`
      );

      setComments(data.product);
    } catch (error) {
      console.log("404 server error please try again", toastoption);
    }
  };

  const makeComment = async (id) => {
    try {
      if (!isLogin) {
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
      console.log("404 server error please try again", toastoption);
    }
    handleCloseModal();
  };

  const AddToCart = async (id) => {
    try {
      if (!isLogin) {
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
      console.log("404 server error please try again", toastoption);
    }
    setQty(1);
  };

  const GetCart = useCallback(async () => {
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
      console.log("404 server error please try again", toastoption);
    }
  }, [cartItem]);

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
      console.log("404 server error please try again", toastoption);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      GetCart();
    }
  }, [currentUser]);

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
          PaymentType: "Not Paid",
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
      console.log("404 server error please try again", toastoption);
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

  const GetOrders = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(process.env.REACT_APP_GET_ALL_ORDER, {
        params: {
          page: activePage,
          size: 0,
        },
      });
      setAllOrders(data.orders);
      setEarnings(data.totalEarnings);
      setTotalCategoryBuy(data.totalCategoryBuy);
      setAllOrdersCount(data.count);
      setTopPurchaseProduct(data.topPurchases);
      setIsLoading(false);
    } catch (error) {
      console.log("404 server error please try again", toastoption);
    }
  };

  useEffect(() => {
    if (loc === "/" || loc === "/admin/orders" || loc === "/admin/dashboard") {
      GetOrders();
    }
  }, [activePage, loc]);

  const GetOrder = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_GET_ORDER}/${id}`
      );
      setOrder(data);
      setIsLoading(false);
    } catch (error) {
      console.log("404 server error please try again", toastoption);
    }
  };

  const OnlinePayment = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(process.env.REACT_APP_GET_KEY);

      const { totalPrice } = productPrices;

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
      console.log("error ", error);

      console.log("404 server error please try again", toastoption);
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
        toastoption,
        DeleteProduct,
        postDetailes,
        editProduct,
        navigate,
        GetOrders,
        GetOrder,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
