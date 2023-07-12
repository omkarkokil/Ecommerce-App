import React, { useContext, useEffect } from "react";
import StateContext from "../hooks/StateContext";
import FunctionContext from "./FunctionContext";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import { CopyAll } from "@mui/icons-material";
import { toast } from "react-toastify";
import ApiContext from "../Api/ApiContext";

const FunctionProvider = ({ children }) => {
  const {
    isLogin,
    setOpen,
    setCategory,
    setValue,
    user,
    setUser,

    product,
    setProduct,
    setQty,
    setRating,
    setComment,
    qty,

    setmakeProductImage,

    setSkipped,
    skipped,
    setActiveStep,
    activeStep,

    orderData,
    setOrderData,
  } = useContext(StateContext);

  const navigate = useNavigate();

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

  const handleProducts = (e) => {
    const { name, value } = e.target;
    setProduct(() => {
      return {
        ...product,
        [name]: value,
      };
    });
  };

  const handleOrder = (e) => {
    const { name, value } = e.target;
    setOrderData(() => {
      return {
        ...orderData,
        [name]: value,
      };
    });
  };

  const handleProductImage = (event) => {
    const files = event.target.files;
    const pic = Array.from(files);

    if (event.target.files.length > 5) {
      toast.warning("You can choose only 5 images");
      return;
    }

    pic.forEach((file) => {
      if (file && file.type === "image/*") {
        setmakeProductImage(files);
      } else {
        toast.error("file format must be an image");
        setmakeProductImage("");
        return;
      }
    });
  };

  const totalPagesCalculator = (total, limit) => {
    const pages = [];
    const condition = window.location.pathname.includes("/admin/users")
      ? parseInt(total) - 1
      : total;
    for (let x = 0; x < condition / limit; x++) {
      pages.push(x);
    }

    return pages;
  };

  const color = blue["A400"];
  const shade1 = blue[50];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: color,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: shade1,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // comment model hanlders

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    if (!isLogin) {
      navigate("/login");
      return false;
    }
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setComment("");
    setRating(0);
  };

  // comment model hanlders

  //? cart

  const IncreaseQty = (stock) => {
    if (qty < 10) {
      if (qty < stock) setQty(qty + 1);
    }
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  //! cart

  /* -------------------------------------------------------------------------- */
  /*                               CheckOut steps                               */
  /* -------------------------------------------------------------------------- */

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 2) {
      setActiveStep(-1);
      navigate("/ordersSuccess");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  /* ----------------------------- CheckOut steps ----------------------------- */

  return (
    <>
      <FunctionContext.Provider
        value={{
          handleOpen,
          handleClose,
          handleCategory,
          handleValue,
          handleUser,
          handleProducts,
          totalPagesCalculator,
          StyledTableCell,
          StyledTableRow,
          handleProductImage,
          // comment
          openModal,
          setOpenModal,
          handleCloseModal,
          handleOpenModal,
          // comment

          // ?cart
          decreaseQty,
          IncreaseQty,
          // !cart

          handleNext,
          handleOrder,
          shade1,
          color,
        }}
      >
        {children}
      </FunctionContext.Provider>
    </>
  );
};

export default FunctionProvider;
