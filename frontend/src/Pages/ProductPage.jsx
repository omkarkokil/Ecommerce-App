import { Stack } from "@mui/system";
import React from "react";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";
import jacket from "../img/jakets.jpg";
import bjackets from "../img/bjackets.jpg";
import { Box, Divider, Rating, IconButton, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Comment from "../components/productpage/Comment";
import ReviewModal from "../components/productpage/ReviewModal";
import GridComment from "../components/productpage/GridComment";

const ProductPage = () => {
  return (
    <>
      <Stack mt="5%" direction={"row"}>
        <Stack width={"40%"} height="80vh" justifyContent={"center"}>
          <Carousel interval={3000} navButtonsAlwaysInvisible>
            <Stack alignItems={"center"} justifyContent="center">
              <img width={"250px"} src={jacket} alt="none" />
            </Stack>
            <Stack alignItems={"center"} justifyContent="center">
              <img height={"250px"} src={bjackets} alt="none" />
            </Stack>
          </Carousel>
        </Stack>
        <Stack mt={"5%"} width={"60%"}>
          <Typography
            variant="h5"
            fontSize={"1.9em"}
            color="initial"
            width={"80%"}
          >
            Best winterware jacket for men
          </Typography>
          <Stack direction={"row"} mb="10px" alignItems="flex-end">
            <Rating size="medium" sx={{ mt: "10px" }} readOnly value={3} />
            <Typography variant="body1" color="initial" ml={"10px"}>
              2 reviews
            </Typography>
          </Stack>
          <Typography variant="h5" color="initial">
            {" "}
            &#8377;2100
          </Typography>
          <Typography variant="body1" sx={{ color: "green", my: "10px" }}>
            Status : InStock
          </Typography>
          <Box width={"80%"} my="10px">
            <Divider />
          </Box>
          <Stack direction="row" alignItems={"center"} width={"60%"}>
            <Stack direction="row" alignItems={"center"} mr="10px">
              <IconButton color="error">
                <Remove />
              </IconButton>
              <Typography variant="body1" mx={"10px"} color="initial">
                2
              </Typography>
              <IconButton color="success">
                <Add />
              </IconButton>
            </Stack>
            <Button variant="contained" color="primary">
              Add to cart
            </Button>
          </Stack>
          <Box width={"80%"} my="10px">
            <Divider />
          </Box>
          <Box width={"80%"}>
            <Typography variant="body2" color="initial" my={"10px"}>
              Desc : Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Totam odio facere aliquid ipsa fuga sed natus eos eligendi,
              placeat delectus debitis, vitae eveniet deleniti voluptates iste
              temporibus itaque? Tenetur, possimus? Architecto possimus
              officiis, nihil blanditiis ipsam labore eligendi numquam
              aspernatur alias ipsum quas soluta accusamus laudantium
              dignissimos. Aspernatur expedita ipsum iste repellat, ad, magnam
              qui quaerat quas quibusdam, laudantium eligendi? Nihil repudiandae
              ea magni quidem adipisci mollitia quod odio explicabo saepe non,
              pariatur hic ab corrupti quaerat, eos incidunt molestiae sint!
              Totam adipisci vel suscipit quos commodi, odio possimus. Ea. Ut
              quisquam eaque delectus veniam laboriosam non quidem, eum
              reiciendis omnis? Excepturi quia neque placeat corporis odio
              sapiente sed reprehenderit labore, amet ea, error repudiandae
              eligendi hic ad illo repellat.
            </Typography>
          </Box>
          <Box width={"25%"}>
            <ReviewModal />
          </Box>
        </Stack>
      </Stack>
      <GridComment />
    </>
  );
};

export default ProductPage;
