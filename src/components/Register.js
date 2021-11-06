import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import baseUrl from "../api";
import "./Components.css";

const Register = (props) => {
  const token = props.token;
  const setToken = props.setToken;
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }
    const response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    });
    const info = await response.json();
    console.log(info);

    if (info.error) {
      return setErrorMessage(info.error);
    }

    localStorage.setItem("token", info.token);
    setToken(info.token);
    props.setIsLoggedIn(true);
    history.push("./home");
  };

  return (
    <>
      <h1 className="page-title">Register</h1>
      <div className="register">
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
          <input
            className="login-input"
            placeholder="Enter name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <input
            className="login-input"
            type="password"
            min={8}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <input
            className="login_input"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
          <button className="login_button">Register</button>
          <p className="errorMessage">{errorMessage}</p>
        </form>
        <Link to="/login">Already have an account? Click here to log in.</Link>
      </div>
    </>
  );
};

export default Register;
