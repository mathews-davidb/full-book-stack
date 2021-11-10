import { useEffect, useState } from "react";
import useStyles from "./styles";

import baseUrl from "../api";
import "./Components.css";

const Cart = (props) => {
  const cart = props.cart;

  const Basket = () => {
    const classes = useStyles();
    return (
      <>
        <body className={classes.body}>
          <div className={classes.cartContainer}>
            <div className={classes.header}>
              <h5 className={classes.heading}>Shopping Cart</h5>
              <h5 className={classes.action}>Remove all</h5>
            </div>

            {cart &&
              cart.products.map((product) => {
                return (
                  <div key={product.product_id}>
                    <div className={classes.cartItems}>
                      <div className={classes.about}>
                        <h1 className={classes.title}>
                          {product.product_name}
                        </h1>
                        <h3 className={classes.subtitle}></h3>
                        {/* <img src={product.image}></img> */}
                      </div>
                      <div className={classes.counter}>
                        <button className={classes.btn}>+</button>
                        <h4 className={classes.count}>
                          {" "}
                          Qty: {product.quantity}{" "}
                        </h4>
                        <button className={classes.btn}>-</button>
                        <h3 className={classes.prices}>$ {product.price}</h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            {cart.products.length === 0 && (
              <div> No items currently in the cart. </div>
            )}
          </div>
        </body>
      </>
    );
  };

  return <Basket></Basket>;
};

export default Cart;
