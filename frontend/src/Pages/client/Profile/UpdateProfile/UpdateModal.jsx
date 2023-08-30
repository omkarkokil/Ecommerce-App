import {
  Avatar,
  Button,
  FormControl,
  Modal,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import FunctionContext from "../../../../Context/Function/FunctionContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

const UpdateModal = () => {
  const { handleCloseModal, handleOpenModal, openModal } =
    React.useContext(FunctionContext);
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>

          <FormControl>
            <TextField
              id="comment"
              name="comment"
              label=""
              sx={{ my: 2 }}
              placeholder="Enter username"
            />
          </FormControl>

          <FormControl>
            <TextField
              type="file"
              id="comment"
              name="comment"
              label=""
              InputProps={{
                startAdornment: <Avatar sx={{ mr: "10px" }} />,
              }}
              sx={{ my: 2 }}
              placeholder="Enter desc"
            />
          </FormControl>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button variant="text" onClick={handleCloseModal} color="error">
              cancel
            </Button>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default UpdateModal;
