import { Link } from "react-router-dom";
import "./Components.css";
import { Button } from "@mui/material";
import { useState } from "react";

const Admin = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const addProduct = () => {};

  return (
    <>
      <h1>Admin</h1>

      <form onSubmit={addProduct}></form>
    </>
  );
};

export default Admin;
