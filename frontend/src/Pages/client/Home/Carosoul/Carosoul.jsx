import { Paper, Typography, Button, Skeleton, Stack } from "@mui/material";
import React, { useContext } from "react";
import Carousel from "react-material-ui-carousel";
import StateContext from "../../../../Context/hooks/StateContext";

const Carosoul = () => {
  const { theme } = useContext(StateContext);
  var items = [
    {
      name: "25% off on home appiliances",
      description: "Probably the most random thing you have ever seen!",
      bg: "https://img.freepik.com/free-psd/realistic-white-sofa-mockup-with-table_176382-545.jpg?w=996&t=st=1679321447~exp=1679322047~hmac=8fe6abcc5f741292bd9c0feb1f5de4025f08f4943f860c38065c65f789796203",
    },
    {
      name: "30% off on  jackets and jeans",
      description: "Most addictive and affordable prices on the jackets",
      bg: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    },
    {
      name: "34% off on headphones and sounds",
      description:
        "Loud the sound and make some noise with the new products with affordable price",
      bg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "20% off on Gaming accessories",
      description:
        "Enter in the battle with the new beast equipment and become the legend of the games",
      bg: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
    },
  ];

  return (
    <>
      <Carousel interval={3000} navButtonsAlwaysInvisible indicators={false}>
        {items.map((ele, id) => {
          return (
            <Paper
              key={id}
              className="caro-img"
              alt={ele.bg}
              elevation={3}
              width="100%"
              sx={{
                [theme.breakpoints.up("xs")]: {
                  height: "40vh",
                },
                [theme.breakpoints.up("sm")]: {
                  height: "50vh",
                },
                [theme.breakpoints.up("md")]: {
                  height: "65vh",
                },
                width: "100%",
                background: `linear-gradient(#00000087 , #000000bf) , url(${ele.bg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                userSelect: "none",
                objectFit: "cover",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    fontSize: "1.7em",
                  },
                  [theme.breakpoints.up("sm")]: {
                    fontSize: "2.3rem",
                  },
                  [theme.breakpoints.up("md")]: {
                    fontSize: "3rem",
                  },
                }}
                color="#fff"
              >
                {ele.name}
              </Typography>
              <Typography
                variant="body2"
                color="#fff"
                textAlign={"center"}
                px={"30px"}
              >
                {ele.description}
              </Typography>
            </Paper>
          );
        })}
      </Carousel>
    </>
  );
};

export default Carosoul;
