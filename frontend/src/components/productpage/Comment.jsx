import { Close, Delete } from "@mui/icons-material";
import {
  Box,
  Divider,
  Stack,
  Typography,
  Avatar,
  Rating,
  Card,
  IconButton,
} from "@mui/material";
import React from "react";

const arr = [
  {
    star: 5,
    time: "March 21, 2022",
    msg: "This is a very nice product",
  },
  {
    star: 4,
    time: "March 21, 2022",
    msg: "This is a very nice product",
  },
  {
    star: 3.5,
    time: "March 21, 2022",
    msg: "This is a very nice productThis is a very nice productThis is a very nice productThis is a very nice product",
  },
  {
    star: 4,
    time: "March 21, 2022",
    msg: "This is a very nice product",
  },
  {
    star: 2.5,
    time: "March 21, 2022",
    msg: "This is a very nice product",
  },
  {
    star: 5,
    time: "March 21, 2022",
    msg: "This is a very nice productThis is a very nice productThis is a very nice productThis is a very nice product",
  },
  {
    star: 2.5,
    time: "March 21, 2022",
    msg: "This is a very nice product",
  },
];

const Comment = () => {
  return (
    <>
      {arr.map((ele, id) => {
        return (
          <Card key={id} elevation={2} sx={{ p: "10px" }}>
            <Stack direction={"row"} alignItems={"center"}>
              <Stack mx={"10px"}>
                <Typography variant="h6" color="initial">
                  Legend the one
                </Typography>
                <Typography variant="body1" color="initial">
                  {ele.time}
                </Typography>
              </Stack>
            </Stack>
            <Rating
              readOnly
              precision={0.5}
              sx={{ my: "10px" }}
              value={ele.star}
            />
            <Typography variant="body2" color="initial">
              {ele.msg}
            </Typography>
          </Card>
        );
      })}
    </>
  );
};

export default Comment;
