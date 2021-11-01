import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import baseUrl from "../api";
import "./Components.css";

const Login = (props) => {
  const token = props.token;
  const setToken = props.setToken;
  const setIsLoggedIn = props.setIsLoggedIn;
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const info = await response.json();

    if (info.error) {
      console.log(info.error);
      return setErrorMessage(info.error);
    }
    console.log("working");
    localStorage.setItem("token", info.token);

    setIsLoggedIn(true);
    setToken(info.token);
    history.push("/account");
  };

  return (
    <>
      <h1 className="page-title">Login</h1>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            placeholder="Enter email"
            minLength={6}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <br></br>
          <input
            className="login-input"
            type="password"
            min={8}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <br></br>
          <button className="login-button">Login</button>
          <p className="errorMessage">{errorMessage}</p>
        </form>
        <br></br>
        <div>
          Don't have an account? <Link to="/register">Sign up.</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
