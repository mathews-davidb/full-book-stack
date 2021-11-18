import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import baseUrl from "../api";

const UpdateProductForm = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const patchProduct = async (e) => {
    e.preventDefault();
    console.log(price);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", quantity);
    formData.append("image", image);
    formData.append("category", category);

    const productId = window.location.pathname.substring(10);
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "PATCH",
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
    setShowForm(false);
    props.getBookInfo();
  };

  return (
    <>
      <div>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            if (showForm) {
              setShowForm(false);
            } else {
              setShowForm(true);
            }
          }}
          style={{
            maxHeight: "3em",
          }}
        >
          Update Product
        </Button>
      </div>
      {showForm && (
        <span>
          <br></br>
          <form onSubmit={patchProduct}>
            <TextField
              style={{ margin: "1rem" }}
              id="add-product-input"
              label="Name"
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ margin: "1rem" }}
              id="add-product-input"
              label="Author"
              value={author}
              variant="outlined"
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
              style={{ margin: "1rem" }}
              id="add-product-input"
              label="Description"
              value={description}
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              style={{ margin: "1rem" }}
              id="add-product-input"
              label="Price"
              value={price}
              variant="outlined"
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              style={{ margin: "1rem" }}
              id="add-product-input"
              label="Stock"
              value={quantity}
              variant="outlined"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <FormControl length>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                style={{ margin: "1rem", minWidth: "120px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select-helper"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {props.categories.map((category) => {
                  return (
                    <MenuItem value={category.name}>{category.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              style={{ margin: "1rem" }}
              id="add-product-input"
              label="Add Product Image"
              InputLabelProps={{ shrink: true }}
              type="file"
              variant="outlined"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <Button
              style={{ margin: "1rem", height: "56px" }}
              type="submit"
              variant="contained"
            >
              Update Product
            </Button>
            <p style={{ color: "red" }}>{errorMessage}</p>
          </form>
        </span>
      )}
    </>
  );
};

export default UpdateProductForm;
