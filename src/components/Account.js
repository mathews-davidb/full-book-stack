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

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  header: {
    marginLeft: "2rem",
  },
  root: {
    width: "60%",
    marginTop: "50px",
    overflowX: "auto",
    marginLeft: "30px",
  },
  row: {
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
      <div className={classes.header}>
        <h1>My Account</h1>
        <h3>Purchased Orders</h3>
      </div>
      <Paper className={classes.root}>
        {orders &&
          orders.map((order) => (
            <div key={order.id}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow className={classes.row}>
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
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ))}
      </Paper>
    </>
  );
};

export default Account;
