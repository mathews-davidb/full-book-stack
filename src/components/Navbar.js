import { Link } from "react-router-dom";
import "./Components.css";

const Navbar = (props) => {
  return (
    <>
      <div className="navbar-top">
        <span className="navbar-logo">
          <Link to="/">Home</Link>
        </span>
        <span className="navbar-search">
          <form>
            <input style={{ height: "20px" }} placeholder="Search"></input>
            <button>
              <img
                height="20px"
                src="https://www.pngfind.com/pngs/m/673-6731269_google-magnifying-glass-png-transparent-png.png"
              ></img>
            </button>
          </form>
        </span>
        {props.isLoggedIn && (
          <span className="navbar-account">
            <Link to="/account">My Account</Link>
          </span>
        )}
        {!props.isLoggedIn && (
          <span className="navbar-login">
            <Link to="/login">Login</Link>
          </span>
        )}
        {props.isLoggedIn && (
          <Link
            to="/"
            onClick={() => {
              localStorage.setItem("token", "");
              props.setIsLoggedIn(false);
              props.setUser(null);
              props.setToken("");
            }}
          >
            Logout{" "}
          </Link>
        )}
        <span className="cart">
          <Link to="/cart">Cart</Link>
        </span>
      </div>
      <div className="navbar-bottom">
        <span> Category 1 |</span>
        <span> Category 2 |</span>
        <span> Category 3 |</span>
      </div>
    </>
  );
};

export default Navbar;
