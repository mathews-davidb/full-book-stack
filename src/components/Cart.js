import "./Components.css";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import baseUrl from "../api";
import { useEffect, useState } from "react";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  header: {
    marginLeft: "30px",
  },
  root: {
    width: "60%",
    marginTop: "50px",
    overflowX: "auto",
    marginLeft: "30px",
  },
  table: {
    minWidth: 700,
  },
  row: {
    backgroundColor: "#8fc1e3",
  },
});

const Cart = (props) => {
  const cart = props.cart;
  console.log(cart);
  const [updatedProduct, setUpdatedProduct] = useState({
    productId: "",
    quantity: "",
  });

  function ccyFormat(num) {
    return `${Number(num).toFixed(2)}`;
  }

  let subtotal = 0;

  if (cart.products) {
    for (let product of cart.products) {
      subtotal = product.price * product.quantity + subtotal;
    }
  }
  const taxes = subtotal * TAX_RATE;
  const invoiceTotal = subtotal + taxes;
  //=======================================================

  const deleteProductFromCart = async (productId) => {
    await fetch(`${baseUrl}/cartItems/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    props.getMyCart();
  };

  //=======================================================

  const updateProductInCart = async () => {
    await fetch(`${baseUrl}/cartItems/${updatedProduct.productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        quantity: updatedProduct.quantity,
      }),
    });
    props.getMyCart();
  };

  useEffect(() => {
    updateProductInCart();
  }, [updatedProduct]);

  //=======================================================

  const Basket = () => {
    const classes = useStyles();

    return (
      <>
        <h3 className={classes.header}>Shopping Cart</h3>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.row}>
                <TableCell>Product</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">@</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!cart.products ||
                (cart.products && cart.products.length === 0)) && (
                <div>There are no items in the cart.</div>
              )}
              {cart.products &&
                cart.products.length > 0 &&
                cart.products.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell align="right">
                      <select
                        name="quantity"
                        onChange={(e) => {
                          setUpdatedProduct({
                            productId: product.id,
                            quantity: e.target.value,
                          });
                        }}
                      >
                        {product.quantity === 1 ? (
                          <option value="1" selected>
                            1
                          </option>
                        ) : (
                          <option value="1">1</option>
                        )}
                        {product.quantity === 2 ? (
                          <option value="2" selected>
                            2
                          </option>
                        ) : (
                          <option value="2">2</option>
                        )}
                        {product.quantity === 3 ? (
                          <option value="3" selected>
                            3
                          </option>
                        ) : (
                          <option value="3">3</option>
                        )}
                        {product.quantity === 4 ? (
                          <option value="4" selected>
                            4
                          </option>
                        ) : (
                          <option value="4">4</option>
                        )}
                        {product.quantity === 5 ? (
                          <option value="5" selected>
                            5
                          </option>
                        ) : (
                          <option value="5">5</option>
                        )}
                      </select>
                      <IconButton>
                        <DeleteForeverIcon
                          onClick={() => deleteProductFromCart(product.id)}
                        ></DeleteForeverIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(product.price * product.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{ccyFormat(subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(taxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  };

  return (
    <div>
      <Basket></Basket>
    </div>
  );
};

export default Cart;
