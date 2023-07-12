import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Rating, Stack } from "@mui/material";
import StateContext from "../../../Context/hooks/StateContext";
import FunctionContext from "../../../Context/Function/FunctionContext";
import { useParams } from "react-router-dom";
import ApiContext from "../../../Context/Api/ApiContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export default function ReviewModal() {
  const { id } = useParams("");

  const {
    comment,
    comments,
    setComment,
    rating,
    setRating,
    currentUser,
    theme,
  } = React.useContext(StateContext);
  const { handleCloseModal, handleOpenModal, openModal } =
    React.useContext(FunctionContext);
  const { makeComment } = React.useContext(ApiContext);
  return (
    <div>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        sx={{
          mt: "10px",
          width: "max-content",
          px: "50px",
        }}
        onClick={() => {
          comments.filter((item) => {
            if (item.userid === currentUser.id) {
              setComment(item.comment);
              setRating(item.rating);
            }
          });
          handleOpenModal();
        }}
      >
        Submit Review
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submit Review
          </Typography>
          <Rating
            precision={0.5}
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            name="half-rating"
          />
          <FormControl>
            <TextField
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              label=""
              multiline
              sx={{ my: 2 }}
              rows={"5"}
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
            <Button
              variant="contained"
              onClick={() => makeComment(id)}
              color="primary"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}
