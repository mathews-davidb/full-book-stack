import { Link } from "react-router-dom";
import "./Components.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import baseUrl from "../api";
import { ThumbUp } from "@mui/icons-material";

const ProductPage = (props) => {
  const [book, setBook] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");

  const getBookInfo = async () => {
    const response = await fetch(`${baseUrl}${window.location.pathname}`);
    const info = await response.json();
    setBook(info);
  };

  useEffect(() => {
    getBookInfo();
  }, []);

  const addItemToCart = async (e) => {
    e.preventDefault();
    const product_id = window.location.pathname.substring(10);

    if (props.user) {
      const response = await fetch(
        `${baseUrl}/orders/${props.cart.id}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify({
            product_id: product_id,
            quantity: quantity,
          }),
        }
      );
      const info = await response.json();
      console.log("working");
      props.getMyCart();
      if (info.error) {
        console.log(info.error);
        return setErrorMessage(info.error);
      }
    } else {
      const response = await fetch(`${baseUrl}/products/${product_id}`);
      const { id, price, name, image } = await response.json();

      if (localStorage.getItem("localCart")) {
        let localCart = JSON.parse(localStorage.getItem("localCart"));
        localCart.push({
          id: id,
          name: name,
          price: price,
          image: image,
          quantity: quantity,
        });
        localStorage.setItem("localCart", JSON.stringify(localCart));
      } else {
        let localCart = [
          {
            product_id: id,
            name: name,
            price: price,
            image: image,
            quantity: quantity,
          },
        ];
        localStorage.setItem("localCart", JSON.stringify(localCart));
      }
      props.getMyCart();
    }
  };

  const test = () => {
    const newCart = localStorage.getItem("localCart");
    console.log(newCart);
  };

  return (
    <div
      style={{
        marginTop: "12em",
        marginLeft: "4rem",
        marginRight: "4rem",
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <img src={book.image}></img>
      <div>
        <h2>{book.name}</h2>
        <div>by {book.author}</div>
        <br></br>
        <div style={{ borderBottom: "1px solid black", paddingBottom: "10px" }}>
          {book.description}
        </div>
        <div style={{ marginTop: "2rem" }}>
          {book.stock && (
            <div>
              <ThumbUp style={{ color: "green", marginRight: "1rem" }} />
              <span> In Stock - {book.stock} available</span>
            </div>
          )}
          {!book.stock && <div style={{ color: "red" }}> Out of Stock</div>}
          <div style={{ marginTop: "1em" }}>${book.price}</div>
          <form onSubmit={addItemToCart} style={{ marginTop: "1em" }}>
            <select
              required
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              <option value="1" selected>
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>{" "}
            <br></br>
            <button>Add to Cart</button>
          </form>
          <button onClick={test}>Test</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
