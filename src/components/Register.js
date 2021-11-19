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

const theme = createTheme();

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
    history.push("./");
  };

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
      <ThemeProvider theme={theme}>
        <br></br>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            width: "60%",
            borderRadius: "10px",
            backgroundColor: "#FBFBFD",
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
            <Avatar sx={{ m: 1, bgcolor: "#e0bc75" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{
                fontFamily: "satisfy",
                fontSize: "3em",
                fontWeight: "700",
              }}
            >
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    className="login-input"
                    placeholder="Enter email"
                    minLength={6}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    className="login-input"
                    placeholder="Enter name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    className="login-input"
                    type="password"
                    min={8}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    className="login_input"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#7395ae" }}
              >
                Register
              </Button>
              <p className="errorMessage">{errorMessage}</p>
              <Grid container justifyContent="flex-end">
                <Grid item style={{ paddingBottom: "2rem" }}>
                  <Link to="/login" variant="body2">
                    Already have an account? Click here to log in.
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Register;
