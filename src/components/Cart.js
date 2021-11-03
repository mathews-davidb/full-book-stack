import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../api";
import "./Components.css";

const Cart = (props) => {
  const [cart, setCart] = useState([]);

  const getMyCart = async () => {
    const resp = await fetch(`${baseUrl}/orders/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    const info = await resp.json();
    setCart(info.products);
  };

  useEffect(() => {
    if (!props.user) {
      return;
    }
    getMyCart();
  }, [props.user]);

  return (
    <>
      <h1>Cart</h1>
      {cart &&
        cart.map((product) => {
          return (
            <div key={product.product_id}>
              <div> {product.product_name}</div>
              <div>{product.price}</div>
              <div>{product.quantity}</div>
            </div>
          );
        })}

      {cart.length === 0 && <div> No items currently in the cart. </div>}
    </>
  );
};

export default Cart;
