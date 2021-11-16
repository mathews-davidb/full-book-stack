import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Components.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const searchSubmit = (e) => {
    const lowercaseSearch = props.searchTerm.toLowerCase();
    history.push(`/products/search/${lowercaseSearch}`);
  };

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
              onSubmit={searchSubmit}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                onChange={(e) => {
                  props.setSearchTerm(e.target.value);
                }}
                type="text"
                placeholder="Search by title, author, etc.."
                style={{
                  width: "80%",
                  height: "2em",
                  borderRadius: "10px",
                  fontSize: "1em",
                  outline: "none",
                  border: "none",
                }}
              ></input>
            </form>
          </div>
          <div className="center" style={{ marginRight: "2em" }}>
            {props.isAdmin && (
              <Link
                to="/admin"
                style={{
                  color: "#F7f9fb",
                  textDecoration: "none",
                  fontSize: "1.2em",
                }}
              >
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

            {props.isLoggedIn && (
              <Link
                to="/"
                onClick={() => {
                  localStorage.setItem("token", "");
                  props.setIsLoggedIn(false);
                  props.setUser(null);
                  props.setToken("");
                  props.setIsAdmin(false);
                  props.setCart({});
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
              class="dropdown"
            >
              {props.categories.map((category) => {
                return (
                  <div class="dropbtn" key={category.id} onClick={handleClose}>
                    <a
                      href={"/products/category/" + category.name.toLowerCase()}
                      style={{
                        textDecoration: "none",
                        color: "#111111",
                        fontSize: "1.2em",
                      }}
                    >
                      {" "}
                      {category.name}
                    </a>
                  </div>
                );
              })}
            </Menu>
            <Button color="inherit">
              <a
                href="/products/category/fiction"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                  borderLeft: "white 1px solid",
                  paddingLeft: "1em",
                }}
              >
                Fiction
              </a>
            </Button>
            <Button color="inherit">
              <a
                href="/products/category/nonfiction"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                  borderLeft: "white 1px solid",
                  paddingLeft: "1em",
                }}
              >
                Nonfiction
              </a>
            </Button>
            <Button color="inherit">
              <a
                href="/products/category/children"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                  borderLeft: "white 1px solid",
                  paddingLeft: "1em",
                }}
              >
                Children
              </a>
            </Button>
            <Button color="inherit">
              <a
                href="/products/category/young%20adult"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                  borderLeft: "white 1px solid",
                  paddingLeft: "1em",
                }}
              >
                Young Adult
              </a>
            </Button>
            <Button color="inherit">
              <a
                href="/products/category/travel"
                style={{
                  textDecoration: "none",
                  color: "#F7f9fb",
                  fontSize: "1.2em",
                  borderLeft: "white 1px solid",
                  paddingLeft: "1em",
                  textTransform: "none",
                }}
              >
                Travel
              </a>
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
