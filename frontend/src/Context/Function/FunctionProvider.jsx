import React, { useContext, useEffect } from "react";
import StateContext from "../hooks/StateContext";
import FunctionContext from "./FunctionContext";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const FunctionProvider = ({ children }) => {
  const {
    setOpen,
    setCategory,
    setValue,
    user,
    setUser,
    imageArr,
    setImageArr,
    currentUser,
    setIsLoading,
    product,
    setProduct,
    setQty,
    qty,
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

  const handleProducts = (e) => {
    const { name, value } = e.target;
    setProduct(() => {
      return {
        ...product,
        [name]: value,
      };
    });
    console.log(product);
  };
  const postDetailes = (pic) => {
    const imageArray = [];
    setIsLoading(true);
    if (pic === undefined) {
      console.log("select img");
    }
    console.log(imageArray);

    for (let u = 0; u < pic.length; u++) {
      const data = new FormData();
      data.append("file", pic[u]);
      data.append("upload_preset", "collage-app");
      data.append("cloud_name", "dfxyr6c40");

      fetch("https://api.cloudinary.com/v1_1/dfxyr6c40/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          imageArray.push(data.url.toString());
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setImageArr(imageArray);
    setIsLoading(false);
  };

  const totalPagesCalculator = (total, limit) => {
    const pages = [];
    for (let x = 0; x < (parseInt(total) - 1) / limit; x++) {
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
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // comment model hanlders

  //? cart

  const IncreaseQty = () => {
    if (qty < 10) {
      setQty(qty + 1);
    }
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  //! cart

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
          postDetailes,
          totalPagesCalculator,
          StyledTableCell,
          StyledTableRow,

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
        }}
      >
        {children}
      </FunctionContext.Provider>
    </>
  );
};

export default FunctionProvider;
