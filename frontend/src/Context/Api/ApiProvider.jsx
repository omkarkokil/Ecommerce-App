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
    isLogin,
    isAdmin,
    setIsAdmin,
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
      const { name, email, password, Cpassword } = user;

      if (password !== Cpassword) {
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
        toast.error(data.msg, toastoption);
        return false;
      }
      if (data.status) {
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
      const { email, password } = user;

      if ((!email, !password)) {
        toast.error("All fields are mandatory", toastoption);
        return false;
      }
      const { data } = await axios.post("/api/auth/loginuser", {
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.msg, toastoption);
        return false;
      }

      if (data.status) {
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

  return (
    <ApiContext.Provider
      value={{ RegisterHandler, logOut, loginhandler, googleLogin }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
