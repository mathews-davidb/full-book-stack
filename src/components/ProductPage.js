import { Link, useHistory } from "react-router-dom";
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
import { toast, Slide, ToastContainer } from "react-toastify";
import UpdateProductForm from "./UpdateProductForm.js";

//======================================================

const ProductPage = (props) => {
  const [book, setBook] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const token = props.token;
  const categories = props.categories;
  const setCategories = props.setCategories;

  //======================================================

  function ccyFormat(num) {
    return `${Number(num).toFixed(2)}`;
  }

  //======================================================

  const getBookInfo = async () => {
    const response = await fetch(`${baseUrl}${window.location.pathname}`);
    const info = await response.json();
    setBook(info);
  };

  useEffect(() => {
    getBookInfo();
  }, []);

  //======================================================

  const addItemToCart = async (e) => {
    console.log("working");
    e.preventDefault();
    const product_id = window.location.pathname.substring(10);

    if (props.user) {
      const response = await fetch(
        `${baseUrl}/orders/${props.cart.id}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          product_id: id,
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

  //======================================================

  const deleteProduct = async () => {
    const productId = window.location.pathname.substring(10);
    await fetch(`${baseUrl}/products/${productId}`, {
      method: "DELETE",
    });
    history.push("/admin");
  };

  //======================================================

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
        marginTop: "3em",
        marginRight: "4em",
        marginLeft: "2em",
      }}
    >
      <div style={{ marginRight: "auto", marginLeft: "auto" }}>
        <img
          style={{ height: "400px" }}
          src={
            book.image && book.image.includes("http")
              ? book.image
              : `/images/${book.image}`
          }
        ></img>
      </div>
      <div style={{ marginRight: "auto", marginLeft: "0em" }}>
        {props.isAdmin && (
          <div
            style={{
              borderRadius: "10px",
              backgroundColor: "#e0e0eb",
              display: "flex",
              padding: "0.5em",
              minHeight: "1.5em",
              alignContent: "center",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <h4
              style={{
                marginLeft: "0.5em",
                marginTop: "0.3em",
              }}
            >
              Admin Controls:
            </h4>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={deleteProduct}
              style={{
                marginRight: "0.5em",
                marginLeft: "0.5em",
                maxHeight: "2em",
                marginTop: "0.3em",
                // color: "red",
                // border: "1px solid red",
              }}
            >
              Delete Product
            </Button>
            <UpdateProductForm
              token={token}
              book={book}
              categories={categories}
              setCategories={setCategories}
              getBookInfo={getBookInfo}
            ></UpdateProductForm>
          </div>
        )}
        <h2>{book.name}</h2>
        <div>by {book.author}</div>
        <br></br>
        <div
          style={{
            borderBottom: "2px solid black",
            paddingBottom: "1em",
          }}
        >
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
          <div style={{ marginTop: "1em" }}>${ccyFormat(book.price)}</div>
          <form onSubmit={addItemToCart} style={{ marginTop: "1em" }}>
            <label>QTY - </label>
            <select
              required
              defaultValue={1}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>{" "}
            <br></br>
            <br></br>
            <Button
              style={{
                marginTop: "1em",
                height: "56px",
                justifyContent: "center",
                backgroundColor: "#7395ae",
                marginBottom: "2rem",
              }}
              onClick={() => {
                toast.success(`You have added ${book.name} to your cart!`, {
                  transition: Slide,
                });
              }}
              type="submit"
              variant="contained"
            >
              Add to Cart
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
