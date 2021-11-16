import {
  Button,
  Card,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import baseUrl from "../api";

const useStyles = makeStyles({
  header: {
    marginLeft: "0",
    fontSize: "1.5rem",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    // gridTemplateColumns: "60% 40%",
    // gridTemplateRows: "50% 50%",
  },
  form: {
    margin: "2rem",
    marginTop: "0.5em",
    justifyContent: "center",
  },
  creditcard: {
    justifyContent: "center",
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
      <h1 style={{ textAlign: "center" }}>Checkout</h1>

      <div className={classes.root}>
        <form
          noValidate
          autoComplete="off"
          className={classes.form}
          //   onSubmit={completeOrder}
        >
          <span>
            <Typography className={classes.header}>
              Billing Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="First Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Last Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Address Line 1"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Address Line 2"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Postal/Zip Code"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField placeholder="City" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Province/State"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField placeholder="Country" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          </span>
          <span>
            <svg
              style={{ alignSelf: "center" }}
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
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  placeholder="Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Valid Thru"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField placeholder="CVC" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          </span>
          <span>
            <Typography className={classes.header}>
              Shipping Information
            </Typography>
            <Checkbox
              onChange={() => {
                if (same) {
                  setSame(false);
                } else {
                  setSame(true);
                }
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="First Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Last Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Address Line 1"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Address Line 2"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Postal/Zip Code"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField placeholder="City" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Province/State"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField placeholder="Country" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          </span>
          <span>
            <Button
              variant="contained"
              onClick={completeOrder}
              style={{
                padding: "1rem",
                marginLeft: "2rem",
                backgroundColor: "#8fc1e3",
              }}
            >
              Confirm Payment
            </Button>
          </span>
        </form>
      </div>
    </>
  );
}

export default CheckoutForm;
