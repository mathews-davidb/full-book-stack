import { useEffect, useState } from "react";
import { Route } from "react-router";
import baseUrl from "./api";
import "./App.css";
import Account from "./components/Account";
import Admin from "./components/Admin";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductCategory from "./components/ProductCategory";
import ProductPage from "./components/ProductPage";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

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

  const getMyCart = async () => {
    console.log("Fetching...");
    const resp = await fetch(`${baseUrl}/orders/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await resp.json();

    //   setCart(info.products);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [token]);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.is_admin);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    getMyCart();
  }, [user]);

  //---------------------------------------------------------

  const getCategories = async () => {
    const response = await fetch(`${baseUrl}/categories`);
    const info = await response.json();
    setCategories(info);
  };

  useEffect(() => {
    getCategories();
  }, []);

  //---------------------------------------------------------

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        setToken={setToken}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        categories={categories}
      ></Navbar>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/cart">
        <Cart user={user} token={token} cart={cart} />
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
        <Register setToken={setToken} setIsLoggedIn={setIsLoggedIn} />
      </Route>
      <Route exact path="/products">
        <AllProducts />
      </Route>
      <Route exact path="/admin">
        <Admin token={token} user={user} categories={categories} />
      </Route>
      <Route exact path="/products/:id">
        <ProductPage />
      </Route>
      <Route exact path="/products/category/:name">
        <ProductCategory />
      </Route>
    </div>
  );
}

export default App;
