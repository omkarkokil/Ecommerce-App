import {
  Avatar,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";

import React, { useContext, useEffect } from "react";
import Comment from "./Comment";
import StateContext from "../../../../../Context/hooks/StateContext";
import { useParams } from "react-router-dom";
import ApiContext from "../../../../../Context/Api/ApiContext";
import Timestamp from "react-timestamp";
import { Person } from "@mui/icons-material";

const GridComment = () => {
  const { comments } = useContext(StateContext);
  const { GetComments } = useContext(ApiContext);
  const { id } = useParams("");

  useEffect(() => {
    GetComments(id);
  }, [id]);

  return (
    <>
      <Stack
        sx={{
          mb: "10px",
          mt: "30px",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" className="obitron">
          REVIEWS
        </Typography>
        <Box width={{ md: "20%", xs: "40%", sm: "30%" }} my="10px">
          <Divider />
        </Box>
      </Stack>

      {comments.length <= 0 ? (
        <Typography
          variant="h6"
          width={"100%"}
          textAlign={"center"}
          color="initial"
        >
          No reviews for this product
        </Typography>
      ) : (
        <Stack alignItems={"center"} mb={"20px"} justifyContent={"center"}>
          {comments.map((ele, id) => {
            return (
              <Stack
                width={{ md: "50%", xs: "60%", sm: "70%" }}
                marginY="10px"
                key={id}
              >
                <Stack direction={"row"}>
                  <Avatar sx={{ marginRight: "10px" }}>
                    {ele.pic && <img src={ele.pic} alt="" height={"100%"} />}
                  </Avatar>
                  <Box>
                    <Typography>
                      {ele.name} on <Timestamp date={ele.createdAt} />
                    </Typography>
                    <Rating
                      readOnly
                      precision={0.5}
                      sx={{ my: "5px" }}
                      value={ele.rating}
                    />
                    <Typography variant="body1">{ele.comment}</Typography>
                  </Box>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}
    </>
  );
};

export default GridComment;
