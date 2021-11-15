import * as React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import baseUrl from "../api";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const CheckoutRedirect = (props) => {
  const token = props.token;
  const setToken = props.setToken;
  const setIsLoggedIn = props.setIsLoggedIn;
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //===================================================================

  const loginSubmit = async (e) => {
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
    localStorage.setItem("token", info.token);

    setIsLoggedIn(true);
    setToken(info.token);

    props.getUser();
    props.getMyCart();

    if (localStorage.getItem("localCart")) {
      let localCart = JSON.parse(localStorage.getItem("localCart"));
      for (let i = 0; i < localCart.length; i++) {
        const response = await fetch(
          `${baseUrl}/orders/${props.cart.id}/products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.token}`,
            },
            body: JSON.stringify({
              product_id: localCart[i].product_id,
              quantity: localCart[i].quantity,
            }),
          }
        );
        const info = await response.json();
      }
    }
    props.getMyCart();
    localStorage.setItem("localCart", "");
    history.push("/checkout");
  };

  //===================================================================

  const guestCheckout = () => {};

  //===================================================================

  return (
    <div style={{ marginTop: "3em" }}>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          style={{ border: "1px solid black", borderRadius: "10px" }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Registered Customers:
            </Typography>
            <Box
              component="form"
              onSubmit={loginSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                lassName="login-input"
                placeholder="Enter email"
                minLength={6}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                className="login-input"
                type="password"
                min={8}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <p className="errorMessage">{errorMessage}</p>
            </Box>
          </Box>
        </Container>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            marginTop: "2em",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{
                fontSize: "1.2em",
                marginTop: "1em",
              }}
            >
              New Customers:
            </Typography>
            <Box>
              <span>Click here to create a new account:</span>
              <Button
                type="submit"
                fullWidth
                onClick={() => {
                  history.push("/register");
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
            <Box
              component="form"
              onSubmit={loginSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <span>Enter email to continue with guest checkout:</span>
              <TextField
                margin="normal"
                required
                fullWidth
                className="login-input"
                type="email"
                min={6}
                placeholder="Enter email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={guestCheckout}
              >
                Continue As Guest
              </Button>
              <p className="errorMessage">{errorMessage}</p>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CheckoutRedirect;
