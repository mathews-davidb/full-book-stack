import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../api";
import "./Components.css";

const Account = (props) => {
  const [orders, setOrders] = useState([]);

  const getMyOrders = async () => {
    const resp = await fetch(`${baseUrl}/orders/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    const info = await resp.json();
    setOrders(info);
  };

  useEffect(() => {
    if (!props.user) {
      return;
    }
    getMyOrders();
  }, [props.user]);

  return (
    <>
      <h1>Account</h1>

      <h2>Purchased Orders</h2>
      {orders.length === 0 && <div> You do not have any past orders. </div>}
      {orders && (
        <div>
          {orders.map((order) => {
            return (
              <div key={order.id}>
                <h3>{order.id}</h3>
                <div>
                  {order.products.map((product) => {
                    return (
                      <div key={product.product_id}>
                        <div> {product.product_name}</div>
                        <div>{product.price}</div>
                        <div>{product.quantity}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Account;
