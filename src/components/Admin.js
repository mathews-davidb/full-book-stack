import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./Components.css";
import {
  Button,
  CssBaseline,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import baseUrl from "../api";

const Admin = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", quantity);
    formData.append("image", image);
    formData.append("category", category);

    const response = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      body: formData,
    });
    const info = await response.json();
    if (info.error) {
      console.log(info.error);
      return setErrorMessage(info.error);
    }
    setName("");
    setDescription("");
    setAuthor("");
    setPrice("");
    setCategory("");
    setQuantity("");
    setImage("");
    setErrorMessage("");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
          }}
        >
          <h1>Admin Dashboard</h1>

          <form onSubmit={addProduct}>
            <TextField
              id="add-product-input"
              label="Name"
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="add-product-input"
              label="Author"
              value={author}
              variant="outlined"
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <TextField
              id="add-product-input"
              label="Description"
              value={description}
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <TextField
              id="add-product-input"
              label="Price"
              value={price}
              variant="outlined"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <TextField
              id="add-product-input"
              label="Stock"
              value={quantity}
              variant="outlined"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-helper"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {props.categories.map((category) => {
                return (
                  <MenuItem value={category.name}>{category.name}</MenuItem>
                );
              })}
            </Select>
            <TextField
              id="add-product-input"
              label="Add Product Image"
              InputLabelProps={{ shrink: true }}
              type="file"
              variant="outlined"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <Button type="submit" variant="outlined">
              Add Product!
            </Button>
          </form>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Box>
      </Container>
    </>
  );
};

export default Admin;
