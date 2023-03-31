import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { Rating, Stack } from "@mui/material";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleOpen}
      >
        Submit Review
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submit Review
          </Typography>
          <Rating precision={0.5} name="half-rating" />
          <FormControl>
            <TextField
              id=""
              label=""
              multiline
              sx={{ my: 2 }}
              rows={"5"}
              placeholder="Enter desc"
            />
          </FormControl>
          <Button variant="contained" onClick={handleClose} color="primary">
            Submit
          </Button>
        </Stack>
      </Modal>
    </div>
  );
}
