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
import img from "../components/media/library3.jpeg";

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
    history.push("/cart");
  };

  //===================================================================

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "repeat",
        minHeight: "84vh",
        height: "100%",
        zIndex: "-2",
        // marginTop: "-3em",
        height: "100vh",
        fontFamily: "Nunito",
      }}
    >
      <br></br>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="s"
          style={{
            width: "60%",
            borderRadius: "10px",
            backgroundColor: "#FBFBFD",
            paddingBottom: "2em",
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
                fontSize: "1.5em",
                marginTop: "1em",
              }}
            >
              Registered Customers:
            </Typography>
            <Box
              component="form"
              onSubmit={loginSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                lassName="login-input"
                placeholder="Enter email"
                minLength={6}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // style={{ backgroundColor: 'white' }}
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                className="login-input"
                type="password"
                min={8}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // style={{ backgroundColor: 'white' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  backgroundColor: "#7395ae",
                }}
              >
                Login
              </Button>
              <p className="errorMessage">{errorMessage}</p>
            </Box>
          </Box>
        </Container>
        <br></br>
        <Container
          component="main"
          maxWidth="s"
          style={{
            width: "60%",
            borderRadius: "10px",
            backgroundColor: "#FBFBFD",
            margingTop: "2em",
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
                margin: "1em",
              }}
            >
              New Customers:
            </Typography>
            <Box>
              <Typography>Click here to create a new account</Typography>
              <Button
                type="submit"
                fullWidth
                onClick={() => {
                  history.push("/register");
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#7395ae" }}
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
              <p className="errorMessage">{errorMessage}</p>
            </Box>
          </Box>
        </Container>
        <br></br>
      </ThemeProvider>
    </div>
  );
};

export default CheckoutRedirect;
