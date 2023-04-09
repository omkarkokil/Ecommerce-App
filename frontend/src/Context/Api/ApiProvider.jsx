import React, { useContext, useEffect } from "react";
import ApiContext from "./ApiContext";
import StateContext from "../hooks/StateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const ApiProvider = ({ children }) => {
  const {
    user,
    userPic,
    currentUser,
    setCurrentUser,
    setIsLogin,
    AllUserData,
    setAllUserData,
    setUserCount,
    setIsLoading,
    activePage,
    setActivePage,
  } = useContext(StateContext);

  const loc = window.location.pathname;
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
        { name, email, password, userPic },
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllUsersData();
  }, [activePage]);

  return (
    <ApiContext.Provider
      value={{ RegisterHandler, logOut, loginhandler, googleLogin, DeleteUser }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
