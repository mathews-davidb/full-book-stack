import {
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import baseUrl from "../api";
import img from "../components/media/library3.jpeg";

const useStyles = makeStyles({
  header: {
    marginLeft: "0",
    fontSize: "1.5rem",
  },
  center: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "2rem",
  },
  billing: {
    width: "40%",
    margin: "0 2rem 2rem 2rem",
  },
  creditcard: {
    width: "40%",
    marginRight: "2rem",
  },
  shipping: {
    width: "80%",
    marginRight: "1.3rem",
    paddingBottom: "2rem",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    margin: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyItems: "end",
  },
});

function CheckoutForm(props) {
  const classes = useStyles();
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLasttName, setBillingLasttName] = useState("");
  const [billingAddresLine1, setBillingAddresLine1] = useState("");
  const [billingAddressLine2, setBillingAddressLine2] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingCountry, setBillingCountry] = useState("");

  const [same, setSame] = useState(false);
  const [shippingFirstName, setshippingFirstName] = useState("");
  const [shippingLasttName, setshippingLasttName] = useState("");
  const [shippingAddresLine1, setshippingAddresLine1] = useState("");
  const [shippingAddressLine2, setshippingAddressLine2] = useState("");
  const [shippingZip, setshippingZip] = useState("");
  const [shippingCity, setshippingCity] = useState("");
  const [shippingState, setshippingState] = useState("");
  const [shippingCountry, setshippingCountry] = useState("");

  const completeOrder = async () => {
    console.log(props.cart.id);
    const response = await fetch(`${baseUrl}/orders/${props.cart.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        total: props.total,
        date: props.purchaseDate,
      }),
    });
    const info = await response.json();
    console.log("working");
  };

  const sameAsShipping = () => {
    if (same) {
      setshippingFirstName(billingFirstName);
      setshippingLasttName(billingLasttName);
      setshippingAddresLine1(billingAddresLine1);
      setshippingAddressLine2(billingAddressLine2);
      setshippingZip(billingZip);
      setshippingCity(billingCity);
      setshippingState(billingState);
      setshippingCountry(billingCountry);
    }
  };

  return (
    <>
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
        <h1
          style={{
            textAlign: "center",
            fontFamily: "satisfy",
            fontSize: "3em",
            fontWeight: "700",
          }}
        >
          Checkout
        </h1>

        <Container
          className={classes.root}
          component="main"
          maxWidth="s"
          style={{
            width: "80%",
            borderRadius: "10px",
            backgroundColor: "#FBFBFD",
            marginBottom: "2rem",
          }}
        >
          <form
            noValidate
            autoComplete="off"
            className={classes.form}
            //   onSubmit={completeOrder}
          >
            <div className={classes.center}>
              <div className={classes.billing}>
                <Typography className={classes.header}>
                  Billing Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="First Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Last Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Address Line 1"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Address Line 2"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Postal/Zip Code"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="City"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Province/State"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Country"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.creditcard}>
                <svg
                  style={{ marginLeft: "1rem" }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 0 24 24"
                  width="40"
                >
                  {/* <Typography className={classes.header}>Card Info</Typography>{" "} */}
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Card Number"
                      variant="outlined"
                      fullWidth
                      size="small"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Valid Thru"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="CVC"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
                <div className={classes.btn}>
                  <Button
                    variant="contained"
                    onClick={completeOrder}
                    style={{
                      padding: "1rem",
                      marginLeft: "2rem",
                      backgroundColor: "#7395ae",
                    }}
                  >
                    COMPLETE ORDER
                  </Button>
                </div>
              </div>
            </div>

            <div className={classes.grid}>
              <div className={classes.shipping}>
                <Typography className={classes.header}>
                  Shipping Information
                </Typography>
                {/* <Checkbox
                onChange={() => {
                  if (same) {
                    setSame(false);
                  } else {
                    setSame(true);
                  }
                }}
                inputProps={{ "aria-label": "controlled" }}
              /> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="First Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Last Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Address Line 1"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Address Line 2"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Postal/Zip Code"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="City"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Province/State"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Country"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </form>
        </Container>
        <br></br>
      </div>
    </>
  );
}

export default CheckoutForm;
