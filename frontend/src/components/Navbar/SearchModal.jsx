import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StateContext from "../../Context/hooks/StateContext";
import FunctionContext from "../../Context/Function/FunctionContext";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search, Send } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  //   bgcolor: "background.paper",
  //   boxShadow: 24,
  p: 4,
};

export default function SearchModal() {
  const { open } = React.useContext(StateContext);
  const { handleClose } = React.useContext(FunctionContext);
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
            sx={{ width: "100%", background: "#fff" }}
            label="Search"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="secondary">
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
