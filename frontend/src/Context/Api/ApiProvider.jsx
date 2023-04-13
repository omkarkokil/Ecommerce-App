import React, { useContext, useEffect } from "react";
import ApiContext from "./ApiContext";
import StateContext from "../hooks/StateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import FunctionContext from "../Function/FunctionContext";

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
    getProduct,
    productImg,
    setproductImg,
    setGetProduct,
    setProductPage,
    productPage,
    productCount,
    setProductCount,

    // comment
    comment,
    rating,
    comments,
    setComments,
    // comment
  } = useContext(StateContext);

  const { totalPagesCalculator, handleCloseModal } =
    useContext(FunctionContext);
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

  useEffect(() => {
    if (loc.includes("/admin") && !localStorage.getItem("isAdmin")) {
      navigate("/");
    }
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Log out successfully", toastoption);
    setIsLogin(false);
  };

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

  const GetAllProducts = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        process.env.REACT_APP_GET_ALL_PRODUCT_URL,
        {
          params: {
            page: productPage,
            size: process.env.REACT_APP_PRODUCT_LIMIT,
          },
        }
      );

      let total = totalPagesCalculator(
        productCount,
        process.env.REACT_APP_PRODUCT_LIMIT
      ).length;

      if (productPage <= total) {
        setProductPage(productPage + 1);
      }

      setAllProducts((prev) => [...prev, ...data.products]);

      setProductCount(data.total);
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
        toast.success(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
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
        GetAllProducts,
        GetProduct,
        makeComment,
        GetComments,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
