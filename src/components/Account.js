import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import baseUrl from "../api";
import "./Components.css";
import img from "../components/media/library3.jpeg";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  header: {
    marginLeft: "2rem",
  },
  root: {
    width: "60%",
    overflowX: "auto",
    margin: "auto",
  },
  row1: {
    backgroundColor: "#5085a5",
    fontSize: "1.5em",
    color: "white",
  },
  row2: {
    backgroundColor: "#8fc1e3",
  },
});

const Account = (props) => {
  const [orders, setOrders] = useState([]);
  const classes = useStyles();

  const getMyOrders = async () => {
    const resp = await fetch(`${baseUrl}/orders/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    const info = await resp.json();
    console.log(info);
    setOrders(info);
  };

  useEffect(() => {
    if (!props.user) {
      return;
    }
    getMyOrders();
  }, [props.user]);

  function ccyFormat(num) {
    return `${Number(num).toFixed(2)}`;
  }

  let subtotal = 0;

  for (let product of orders) {
    subtotal = product.price * product.quantity + subtotal;
  }

  const taxes = subtotal * TAX_RATE;
  const invoiceTotal = subtotal + taxes;

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

          fontFamily: "Nunito",
        }}
      >
        <br></br>
        {/* <h1 style={{ marginLeft: "2rem" }}>
        Welcome, {props.user.name.split(" ")[0]}!
      </h1> */}
        <h1 style={{ marginLeft: "2rem" }}>My Account:</h1>
        <h2 style={{ textAlign: "center" }}>Order History</h2>

        {orders &&
          orders.map((order) => (
            <div>
              <Paper className={classes.root}>
                <div key={order.id}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow className={classes.row1}>
                        <TableCell
                          align="left"
                          style={{ color: "white", fontSize: "0.7em" }}
                        >
                          Order #: {order.id}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell
                          align="right"
                          style={{ color: "white", fontSize: "0.7em" }}
                        >
                          Date Purchased: {order.date}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.row2}>
                        <TableCell>Product</TableCell>
                        <TableCell align="left">Qty.</TableCell>
                        <TableCell align="right">@</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.products.map((product) => {
                        return (
                          <TableRow key={product.product_id}>
                            <TableCell>{product.product_name}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                            <TableCell align="right">
                              {ccyFormat(product.price * product.quantity)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow>
                        <TableCell />
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">
                          Total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $
                          {order.total}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Paper>
              <div style={{ margin: "1rem" }}>
                <br></br>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Account;
