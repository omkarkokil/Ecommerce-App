import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StateContext from "../../../Context/hooks/StateContext";
import FunctionContext from "../../../Context/Function/FunctionContext";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search, Send } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiContext from "../../../Context/Api/ApiContext";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  p: 4,
};

export default function SearchModal() {
  const { open, search, setSearch } = React.useContext(StateContext);
  const { handleClose } = React.useContext(FunctionContext);
  const Navigate = useNavigate("");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="search"
            sx={{
              width: "100%",
              background: "#fff",
            }}
            label="Search"
            name="search"
            value={search}
            variant="filled"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <Link to={`/products/${search}`}> */}
                  <IconButton
                    color="secondary"
                    disabled={search === "" ? true : ""}
                    style={{ display: search === "" ? "none" : "block" }}
                    onClick={() => {
                      setSearch("");
                      Navigate(`/products/${search}`);
                      handleClose();
                    }}
                  >
                    <Send />
                  </IconButton>
                  {/* </Link> */}
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
