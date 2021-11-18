import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import baseUrl from "./api";
import "./App.css";
import Account from "./components/Account";
import Admin from "./components/Admin";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import CheckoutForm from "./components/Checkout";
import CheckoutRedirect from "./components/CheckoutRedirect";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductCategory from "./components/ProductCategory";
import ProductPage from "./components/ProductPage";
import Register from "./components/Register";
import SearchResult from "./components/SearchResult";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

  //============================================================
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link to="/">FULL BOOKSTACK</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  //============================================================
  const getUser = async () => {
    if (!token) {
      return;
    }
    setIsLoggedIn(true);
    const response = await fetch(`${baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await response.json();
    setUser(info);
  };

  //============================================================

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  //============================================================

  useEffect(() => {
    getUser();
  }, [token]);

  //============================================================

  useEffect(() => {
    if (user) {
      setIsAdmin(user.is_admin);
    }
  }, [user]);

  //============================================================

  const getMyCart = async () => {
    if (user) {
      const resp = await fetch(`${baseUrl}/orders/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await resp.json();
      console.log(info);
      setCart(info);
    } else {
      const products = JSON.parse(localStorage.getItem("localCart"));
      if (products) {
        setCart({
          products: products.map((product) => ({
            id: null,
            order_id: null,
            product_id: product.product_id,
            product_name: product.name,
            product_image: product.image,
            price: product.price,
            quantity: product.quantity,
          })),
        });
      }
    }
  };

  //============================================================

  useEffect(() => {
    getMyCart();
    console.log(cart);
  }, [user]);

  //============================================================

  useEffect(async () => {
    if (localStorage.getItem("localCart")) {
      let localCart = JSON.parse(localStorage.getItem("localCart"));
      for (let i = 0; i < localCart.length; i++) {
        const response = await fetch(`${baseUrl}/orders/${cart.id}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: localCart[i].product_id,
            quantity: localCart[i].quantity,
          }),
        });
        const info = await response.json();
      }
    }
    getMyCart();
    localStorage.setItem("localCart", "");
  }, [cart.id]);

  //============================================================

  const getCategories = async () => {
    const response = await fetch(`${baseUrl}/categories`);
    const info = await response.json();
    setCategories(info);
  };

  useEffect(() => {
    getCategories();
  }, []);

  //============================================================

  // useEffect(() => {
  //   let toastvar = localStorage.getItem("toast");
  //   console.log("toast:", toastvar);
  //   if (toastvar == 1) {
  //     toast.success(`Welcome, ${user.name}.  You are now logged in. `, {
  //       transition: Slide,
  //     });
  //     localStorage.setItem("toast", "");
  //   }
  // }, []);

  //============================================================

  return (
    <>
      <ToastContainer autclose={5000} position="top-right" />
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        setToken={setToken}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        categories={categories}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setCart={setCart}
      ></Navbar>

      <Route exact path="/">
        <Home />
      </Route>
      <div>
        <div
          style={{
            backgroundImage: `url("images/library3.jpeg")`,
            backgroundRepeat: "repeat",
          }}
        >
          <Route exact path="/cart">
            <Cart
              user={user}
              token={token}
              cart={cart}
              getMyCart={getMyCart}
              setTotal={setTotal}
              setPurchaseDate={setPurchaseDate}
            />
          </Route>
          <Route exact path="/account">
            <Account token={token} user={user} />
          </Route>
          <Route exact path="/login">
            <Login
              token={token}
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Route>
          <Route exact path="/register">
            <Register
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              getUser={getUser}
              user={user}
              getMyCart={getMyCart}
            />
          </Route>
          <Route exact path="/products">
            <AllProducts />
          </Route>
          <Route exact path="/admin">
            <Admin token={token} user={user} categories={categories} />
          </Route>
          <Route exact path="/products/:id">
            <ProductPage
              cart={cart}
              user={user}
              token={token}
              getMyCart={getMyCart}
              categories={categories}
              getCategories={getCategories}
            />
          </Route>
          <Route exact path="/products/category/:name">
            <ProductCategory />
          </Route>
          <Route exact path="/products/search/:searchterm">
            <SearchResult />
          </Route>
          <Route exact path="/checkout">
            <CheckoutForm
              total={total}
              purchaseDate={purchaseDate}
              cart={cart}
              token={token}
            />
          </Route>
          <Route exact path="/checkout-redirect">
            <CheckoutRedirect
              token={token}
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              getMyCart={getMyCart}
              getUser={getUser}
              cart={cart}
            />
          </Route>
        </div>
        <div className="footer" style={{ padding: "0" }}>
          <Copyright sx={{ mt: 1, mb: 1 }} />
        </div>
      </div>
    </>
  );
}

export default App;
