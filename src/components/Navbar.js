import * as React from "react";
import { Link } from "react-router-dom";
import "./Components.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <>
      {/* <AppBar>
        <Toolbar> */}
      <div className="navbar">
        <div className="navbar-top">
          <div className="center">
            <Link
              to="/"
              style={{
                fontFamily: "serif",
                fontSize: "2rem",
                color: "#F7f9fb",
                textDecoration: "None",
              }}
            >
              FULL BOOKSTACK
            </Link>
          </div>
          <div className="center">
            <form
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                type="text"
                placeholder="Search"
                style={{
                  width: "60%",
                  height: "1.8em",
                  borderRadius: "10px",
                  fontSize: "1.1em",
                  outline: "none",
                  border: "none",
                }}
              ></input>
            </form>
          </div>
          <div className="center">
            {props.isAdmin && (
              <Link to="/admin" style={{ color: "#F7f9fb" }}>
                Admin
              </Link>
            )}

            {props.isLoggedIn && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Link to="/account">
                  <AccountCircle style={{ color: "#F7f9fb" }} />
                </Link>
              </IconButton>
            )}

            {!props.isLoggedIn && (
              <Link
                to="/login"
                style={{
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            )}

            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Link to="/cart">
                <ShoppingCartIcon style={{ color: "#F7f9fb" }} />
              </Link>
            </IconButton>
            {props.isLoggedIn && (
              <Link
                to="/"
                onClick={() => {
                  localStorage.setItem("token", "");
                  props.setIsLoggedIn(false);
                  props.setUser(null);
                  props.setToken("");
                  props.setIsAdmin(false);
                }}
                style={{
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                  textDecoration: "none",
                }}
              >
                Logout
              </Link>
            )}
          </div>
        </div>

        <div className="navbar-bottom" style={{ backgroundColor: "#8fc1e3" }}>
          <div>
            <IconButton
              id="basic-button"
              size="large"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? "true" : undefined}
              onClick={handleClick}
              style={{
                textDecoration: "none",
                color: "#F7f9fb",
                fontSize: "1.1em",
              }}
              margin-
            >
              <MenuIcon /> All Categories
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {props.categories.map((category) => {
                return (
                  <MenuItem key={category.id} onClick={handleClose} style={{}}>
                    <Link
                      to={"/products/category/" + category.name.toLowerCase()}
                      style={{ textDecoration: "none", color: "Black" }}
                    >
                      {" "}
                      {category.name}
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
            <Button color="inherit">
              <Link
                to="/products/category/fiction"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                }}
              >
                {"| "}
                Fiction
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/products/category/nonfiction"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                }}
              >
                {"| "}
                Nonfiction
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/products/category/children"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                }}
              >
                {"| "}
                Children
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/products/category/young%20adult"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                }}
              >
                {"| "}
                Young Adult
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/products/category/travel"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                }}
              >
                {"| "}
                Travel
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* </Toolbar>
      </AppBar> */}
    </>
  );
};

export default Navbar;
