import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import React from "react";
import { Category, Money, Person, ShoppingCart } from "@mui/icons-material";

const DataCard = () => {
  const arr = [
    {
      title: "Total Products",
      desc: 10,
      icon: <Category />,
      color: "linear-gradient(#CB218E,#6617CB)",
    },
    {
      title: "Orders",
      desc: 10,
      icon: <ShoppingCart />,
      color: "linear-gradient(#DE4DAA , #F6D327)",
    },
    {
      title: "Total users",
      desc: 10,
      icon: <Person />,
      color: "linear-gradient(#009FFD , #2A2A72)",
    },
    {
      title: "Earnings",
      desc: 10000,
      icon: <Money />,
      color: "linear-gradient(#20BF55 , #01BAEF)",
    },
  ];
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
        width="100%"
      >
        {arr.map((ele, index) => {
          return (
            <Card
              sx={{
                width: "20%",
                marginX: "10px",
                background: "#f9f9f9",
              }}
              key={index}
            >
              <CardContent>
                <Avatar sx={{ background: ele.color }}>{ele.icon}</Avatar>
                <Typography variant="h6" my={"5px"} component="div">
                  {ele.title}
                </Typography>
                <Typography variant="body1">{ele.desc}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </>
  );
};

export default DataCard;
