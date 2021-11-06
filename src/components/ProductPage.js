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

const ProductPage = (props) => {
  const [book, setBook] = useState("");

  const getBookInfo = async () => {
    const response = await fetch(`${baseUrl}${window.location.pathname}`);
    const info = await response.json();
    setBook(info);
  };

  useEffect(() => {
    getBookInfo();
  }, []);

  return (
    <div
      style={{
        marginTop: "6rem",
        marginLeft: "1.2rem",
        marginRight: "1.2rem",
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
          {book.stock && <div> In Stock - {book.stock} available</div>}
          {!book.stock && <div style={{ color: "red" }}> Out of Stock</div>}
          <div style={{ marginTop: "1em" }}>${book.price}</div>
          <form style={{ marginTop: "1em" }}>
            <select>
              <option value="1">1</option>
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
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
