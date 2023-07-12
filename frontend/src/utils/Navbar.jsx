import {
  Dashboard,
  Logout,
  Person,
  Search,
  ShoppingBag,
  ShoppingCartRounded,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Badge from "@mui/material/Badge";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StateContext from "../Context/hooks/StateContext";
import FunctionContext from "../Context/Function/FunctionContext";
import ApiContext from "../Context/Api/ApiContext";

const Navbar = () => {
  const { isLogin, currentUser, cartCount, isAdmin, theme } =
    useContext(StateContext);
  const { logOut } = useContext(ApiContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { handleOpen } = useContext(FunctionContext);

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",

          background: "#fff",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: "100",
          boxShadow: "0 0 2px #111",
          [theme.breakpoints.up("xs")]: {
            height: "6vh",
          },
          [theme.breakpoints.up("sm")]: {},
          [theme.breakpoints.up("md")]: {
            height: "8vh",
          },
          [theme.breakpoints.up("lg")]: {},
        }}
        className="Nav-main"
      >
        <Stack alignItems="center" ml={"20px"}>
          <Typography fontSize={"1.10em"} className="obitron">
            ONESTOPSHOP
          </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "flex-end" }}
        >
          <IconButton sx={{ color: "#000" }} onClick={handleOpen}>
            {" "}
            <Search />{" "}
          </IconButton>
          {isLogin === false ? (
            <Link
              className="mx-2"
              style={{
                background: "darkviolet",
                borderRadius: "2px",
                padding: "5px 15px",
                boxShadow: "0 0 2px #111",
              }}
              to="/login"
            >
              <Typography variant="subtitle2" color="white" fontSize={".75em"}>
                SIGN IN
              </Typography>
            </Link>
          ) : (
            <>
              <Link to={"/addcart"} className="mx-2">
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingCartRounded sx={{ color: "#000" }} />
                </Badge>
              </Link>

              <div>
                <Avatar
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  variant="circular"
                  alt="none"
                  onClick={handleMenu}
                  src={currentUser.userpic}
                  sx={{
                    width: "30px",
                    height: "30px",
                    mx: "10px",
                    cursor: "pointer",
                  }}
                />

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  onClose={handleClose}
                >
                  <Link to={"/profile"} style={{ color: "#000" }}>
                    <MenuItem
                      sx={{ px: "30px", py: "10px" }}
                      onClick={handleClose}
                    >
                      <Avatar />
                      My Account
                    </MenuItem>
                  </Link>

                  <Divider />
                  {isAdmin ? (
                    <Link to={"/admin/dashboard"} style={{ color: "#000" }}>
                      <MenuItem sx={{ px: "30px" }} onClick={handleClose}>
                        <ListItemIcon>
                          <Dashboard fontSize="small" />
                        </ListItemIcon>
                        DashBoard
                      </MenuItem>
                    </Link>
                  ) : (
                    ""
                  )}

                  <Link to={"/orders"} style={{ color: "#000" }}>
                    <MenuItem sx={{ px: "30px" }} onClick={handleClose}>
                      <ListItemIcon>
                        <ShoppingBag fontSize="small" />
                      </ListItemIcon>
                      Orders
                    </MenuItem>
                  </Link>

                  <Box onClick={logOut} style={{ color: "#000" }}>
                    <MenuItem sx={{ px: "30px" }} onClick={handleClose}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Log Out
                    </MenuItem>
                  </Box>
                </Menu>
              </div>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Navbar;
