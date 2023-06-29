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
import {
  Add,
  Category,
  Comment,
  Dashboard,
  DashboardOutlined,
  ExitToApp,
  Home,
  Logout,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import StateContext from "../Context/hooks/StateContext";
import { useEffect } from "react";
import { ViewAgenda } from "@mui/icons-material";
import { Avatar, Collapse, Stack } from "@mui/material";
import { Expand } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { ExpandLess } from "@mui/icons-material";
import ViewProduct from "./pages/ViewProduct";
import { useContext } from "react";
import FunctionContext from "../Context/Function/FunctionContext";
import EditProduct from "./pages/EditProduct";
import Navbar from "../utils/Navbar";
import UserOrder from "./pages/UserOrder";

const drawerWidth = 240;

function AdminNav(props) {
  const { window } = props;

  const loc = useLocation("");

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { color } = useContext(FunctionContext);

  const arr = [
    {
      name: "DashBoard",
      icon: <Dashboard />,
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
      name: "Go Back",
      icon: <ExitToApp />,
      link: "/",
    },
    // {
    //   name: "Log out",
    //   icon: <Logout />,
    //   link: "/",
    // },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h5" color={color} mx={"10px"}>
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
                  <ListItemButton sx={{ color: "#000" }} onClick={handleClick}>
                    <ListItemIcon sx={{ color: "#000" }}>
                      <Category />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "#000" }} primary={"Products"} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List sx={{ color: "#000" }} component="div" disablePadding>
                      <Link to={"/admin/addproducts"}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon sx={{ color: "#000" }}>
                            <Add />
                          </ListItemIcon>
                          <ListItemText
                            sx={{ color: "#000" }}
                            primary="Add Product"
                          />
                        </ListItemButton>
                      </Link>
                    </List>
                    <List sx={{ color: "#000" }} component="div" disablePadding>
                      <Link to={"/admin/products"}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon sx={{ color: "#000" }}>
                            <ViewAgenda />
                          </ListItemIcon>
                          <ListItemText
                            sx={{ color: "#000" }}
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
                  <ListItemIcon sx={{ color: "#000" }}>{ele.icon}</ListItemIcon>
                  <ListItemText sx={{ color: "#000" }} primary={ele.name} />
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
    <>
      {/* <Navbar /> */}
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
                background: "ghostwhite",
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
                background: "ghostwhite",
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
            <AddProduct />
          ) : loc.pathname === "/admin/products" ? (
            <ViewProduct />
          ) : loc.pathname === "/admin/orders" ? (
            <Orders />
          ) : loc.pathname === "/admin/users" ? (
            <Users />
          ) : loc.pathname.includes("/admin/editProduct") ? (
            <EditProduct />
          ) : loc.pathname.includes("/admin/getOrder") ? (
            <UserOrder />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
}

export default AdminNav;
