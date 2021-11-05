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
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

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

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        setToken={setToken}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      ></Navbar>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/cart">
        <Cart user={user} token={token} />
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
          token={token}
          setToken={setToken}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Route>
      <Route exact path="/products">
        <AllProducts />
      </Route>
      <Route exact path="/admin">
        <Admin token={token} user={user} />
      </Route>
    </div>
  );
}

export default App;
