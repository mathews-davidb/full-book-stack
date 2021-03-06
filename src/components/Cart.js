import "./Components.css";
import {
  Button,
  CardMedia,
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
import { useHistory } from "react-router";
import {
  SettingsOverscanOutlined,
  SettingsOverscanTwoTone,
} from "@mui/icons-material";
import img from "../components/media/library3.jpeg";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  header: {
    marginLeft: "30px",
  },
  root: {
    maxWidth: "800px",
    marginTop: "3em",
    overflowX: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
  table: {
    minWidth: 500,
  },
  row: {
    backgroundColor: "#7395ae",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem",
  },
});

const Cart = (props) => {
  const cart = props.cart;
  const history = useHistory();
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

  const deleteProductFromCart = async (productId, localProductId) => {
    if (props.user) {
      await fetch(`${baseUrl}/cartItems/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
    } else {
      let localCart = JSON.parse(localStorage.getItem("localCart"));
      for (let i = 0; i < localCart.length; i++) {
        if (localCart[i].product_id === localProductId) {
          localCart.splice(i, 1);
          localStorage.setItem("localCart", JSON.stringify(localCart));
          break;
        }
      }
    }
    console.log("working");
    props.getMyCart();
  };

  //=======================================================

  const updateProductInCart = async (localProductId) => {
    if (props.user) {
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
    } else {
      if (localStorage.getItem("localCart")) {
        let localCart = JSON.parse(localStorage.getItem("localCart"));
        for (let i = 0; i < localCart.length; i++) {
          console.log(localCart[i].product_id, updatedProduct.localProductId);
          if (localCart[i].product_id === updatedProduct.localProductId) {
            localCart[i].quantity = updatedProduct.quantity;
            localStorage.setItem("localCart", JSON.stringify(localCart));
            break;
          }
        }
      }
      console.log("working");
    }
    props.getMyCart();
  };

  useEffect(() => {
    updateProductInCart();
  }, [updatedProduct]);

  //=======================================================

  const Basket = () => {
    const classes = useStyles();

    return (
      <div
        style={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "repeat",
          minHeight: "84vh",
          height: "100%",
          zIndex: "-2",
          // marginTop: "-3em",
          height: "100",
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
          Shopping Cart
        </h1>
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
                <div
                  style={{
                    marginLeft: "1em",
                    marginTop: "1em",
                    fontSize: "1.2em",
                  }}
                >
                  There are no items in the cart.
                </div>
              )}
              {cart.products &&
                cart.products.length > 0 &&
                cart.products.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={`${product.product_image}`}
                        style={{ height: "5em", marginRight: "1em" }}
                      />
                      {product.product_name}
                    </TableCell>
                    <TableCell align="right">
                      <select
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => {
                          setUpdatedProduct({
                            productId: product.id,
                            localProductId: product.product_id,
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
                          onClick={() =>
                            deleteProductFromCart(
                              product.id,
                              product.product_id
                            )
                          }
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
        <div className={classes.btn}>
          <Button
            style={{
              marginTop: "1em",
              height: "56px",
              justifyContent: "center",
              backgroundColor: "#7395ae",
              marginBottom: "2rem",
            }}
            onClick={() => {
              if (props.cart.products.length > 0) {
                if (props.user) {
                  props.setTotal(ccyFormat(invoiceTotal));
                  props.setPurchaseDate(new Date().toDateString());
                  history.push("/checkout");
                } else {
                  props.setTotal(invoiceTotal);
                  props.setPurchaseDate(new Date().toDateString());
                  history.push("/checkout-redirect");
                }
              }
            }}
            type="submit"
            variant="contained"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Basket></Basket>
    </div>
  );
};

export default Cart;
