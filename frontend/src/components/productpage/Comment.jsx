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
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiContext from "../../Context/Api/ApiContext";
import StateContext from "../../Context/hooks/StateContext";

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
  const { id } = useParams("");
  const { comments } = useContext(StateContext);
  const { GetComments } = useContext(ApiContext);

  useEffect(() => {
    GetComments(id);
    console.log(comments);
  }, []);

  return (
    <>
      {comments != null
        ? comments.map((ele, id) => {
            return (
              <Card key={id} elevation={2} sx={{ p: "10px" }}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Stack mx={"10px"}>
                    <Typography variant="h6" color="initial">
                      {ele.name}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      March 21, 2022
                    </Typography>
                  </Stack>
                </Stack>
                <Rating
                  readOnly
                  precision={0.5}
                  sx={{ my: "10px" }}
                  value={ele.rating}
                />
                <Typography variant="body2" color="initial">
                  {ele.comment}
                </Typography>
              </Card>
            );
          })
        : ""}
    </>
  );
};

export default Comment;
