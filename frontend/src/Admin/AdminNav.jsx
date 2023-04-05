import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import {
  Add,
  Category,
  Comment,
  Dashboard,
  Home,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import AdminProduct from "./pages/AdminProduct";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import AReviews from "./pages/AReviews";
import StateContext from "../Context/hooks/StateContext";
import { useEffect } from "react";
import { ViewAgenda } from "@mui/icons-material";
import { Avatar, Collapse, Stack } from "@mui/material";
import { Expand } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { ExpandLess } from "@mui/icons-material";
import ViewProduct from "./pages/ViewProduct";

const drawerWidth = 240;

function AdminNav(props) {
  const { window } = props;
  const shade1 = blue[50];
  const color = blue["A400"];
  const loc = useLocation("");

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const arr = [
    {
      name: "DashBoard",
      icon: <Home />,
      link: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <Category />,
      link: "/admin/products",
    },
    {
      name: "Orders",
      icon: <ShoppingCart />,
      link: "/admin/orders",
    },
    {
      name: "Users",
      icon: <Person />,
      link: "/admin/users",
    },
    {
      name: "Reviews",
      icon: <Comment />,
      link: "/admin/reviews",
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h5" mx={"10px"} color="#fff">
          Admin panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {arr.map((ele, index) => (
          <ListItem key={index} disablePadding>
            {ele.name === "Products" ? (
              <>
                <Box width={"100%"}>
                  <ListItemButton sx={{ color: "#fff" }} onClick={handleClick}>
                    <ListItemIcon sx={{ color: "#fff" }}>
                      <Category />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "#fff" }} primary={"Products"} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List sx={{ color: "#fff" }} component="div" disablePadding>
                      <Link to={"/admin/addproducts"}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon sx={{ color: "#fff" }}>
                            <Add />
                          </ListItemIcon>
                          <ListItemText
                            sx={{ color: "#fff" }}
                            primary="Add Product"
                          />
                        </ListItemButton>
                      </Link>
                    </List>
                    <List sx={{ color: "#fff" }} component="div" disablePadding>
                      <Link to={"/admin/products"}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon sx={{ color: "#fff" }}>
                            <ViewAgenda />
                          </ListItemIcon>
                          <ListItemText
                            sx={{ color: "#fff" }}
                            primary="View Product"
                          />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Collapse>
                </Box>
              </>
            ) : (
              <Link to={ele.link} style={{ width: "100%" }}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#fff" }}>{ele.icon}</ListItemIcon>
                  <ListItemText sx={{ color: "#fff" }} primary={ele.name} />
                </ListItemButton>
              </Link>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", sm: "none" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#212121",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#212121",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box width={"100%"}>
        {loc.pathname === "/admin/dashboard" ? (
          <DashBoard />
        ) : loc.pathname === "/admin/addproducts" ? (
          <AdminProduct />
        ) : loc.pathname === "/admin/products" ? (
          <ViewProduct />
        ) : loc.pathname === "/admin/orders" ? (
          <Orders />
        ) : loc.pathname === "/admin/users" ? (
          <Users />
        ) : loc.pathname === "/admin/reviews" ? (
          <AReviews />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default AdminNav;
