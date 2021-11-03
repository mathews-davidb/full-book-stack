import { Link } from "react-router-dom";
import "./Components.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import baseUrl from "../api";

const AllProducts = (props) => {
  const [books, setBooks] = useState([]);

  const getAllBooks = async () => {
    const resp = await fetch(`${baseUrl}/products`);
    const info = await resp.json();
    setBooks(info);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      <h1>All Books</h1>
      <div>
        {books.map((book) => {
          return (
            <div key={book.id}>
              <img src={book.image} height="200px"></img>
              <br></br>
              <span>{book.name}</span> <span>by {book.author}</span>
              <br></br>
              <span>{book.description}</span>
              <span>{book.price} -</span>
              <span>QTY: {book.stock}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllProducts;
