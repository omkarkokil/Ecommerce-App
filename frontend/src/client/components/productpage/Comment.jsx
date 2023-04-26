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
import ApiContext from "../../../Context/Api/ApiContext";
import StateContext from "../../../Context/hooks/StateContext";

import Timestamp from "react-timestamp";

const Comment = () => {
  const { id } = useParams("");
  const { comments } = useContext(StateContext);
  const { GetComments } = useContext(ApiContext);

  useEffect(() => {
    GetComments(id);
  }, []);
  // console.log(comments);
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
                      <Timestamp date={ele.createdAt} />
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
