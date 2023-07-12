import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import React, { useContext, useEffect } from "react";
import { Category, Money, Person, ShoppingCart } from "@mui/icons-material";
import StateContext from "../../Context/hooks/StateContext";
import ApiContext from "../../Context/Api/ApiContext";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const DataCard = () => {
  const { userCount, theme, productCount, allOrdersCount, earnings } =
    useContext(StateContext);

  const arr = [
    {
      title: "Products",
      desc: productCount,
      icon: <Category />,
      color: "linear-gradient(#CB218E,#6617CB)",
      textColor: "#CB218E",
      link: "/admin/products",
    },
    {
      title: "Orders",
      desc: allOrdersCount,
      icon: <ShoppingCart />,
      color: "linear-gradient(#DE4DAA , #F6D327)",
      textColor: "#f66627",
      link: "/admin/orders",
    },
    {
      title: "Users",
      desc: userCount,
      icon: <Person />,
      color: "linear-gradient(#009FFD , #2A2A72)",
      textColor: "#009FFD",
      link: "/admin/users",
    },
    {
      title: "Earnings",
      desc: earnings,
      icon: <Money />,
      color: "linear-gradient(#20BF55 , #01BAEF)",
      textColor: "#20BF55",
      link: "/admin/orders",
    },
  ];

  return (
    <>
      <Stack ml={{ md: "50px" }}>
        <Grid
          justifyContent={"center"}
          rowSpacing={1}
          container={{ md: true, xs: false }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12}>
            <Box
              id="gridBox"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                [theme.breakpoints.up("xs")]: {
                  justifyContent: "center",
                },
                [theme.breakpoints.up("md")]: {
                  justifyContent: "flex-start",
                },
                height: "max-content",
                marginTop: "30px",
              }}
            >
              {arr.map((ele, index) => {
                return (
                  <Card
                    sx={{
                      transition: ".2s all",
                      "&:hover": { scale: "1.04" },
                      [theme.breakpoints.up("md")]: {
                        width: "21%",
                        mb: "0px",
                      },
                      [theme.breakpoints.up("xs")]: {
                        width: "42.5%",
                        mb: "15px",
                      },
                      mr: "20px",
                      background: "ghostwhite",
                    }}
                    key={index}
                  >
                    <Link height="100%" width="100%" to={ele.link} color="#333">
                      <CardContent>
                        <Avatar
                          sx={{ background: ele.color }}
                          variant="rounded"
                        >
                          {ele.icon}
                        </Avatar>
                        <Typography variant="h6" fontSize={"1em"} mt={"5px"}>
                          {ele.title}
                        </Typography>
                        <CountUp
                          start={0}
                          style={{
                            color: ele.textColor,
                            fontSize: "1.4em",
                          }}
                          end={ele.desc}
                        />
                        <Box
                          sx={{
                            height: "5px",
                            width: "80%",
                            background: ele.color,
                            borderRadius: "10px",
                          }}
                        ></Box>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default DataCard;
