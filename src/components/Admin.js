import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./Components.css";
import {
  Button,
  CssBaseline,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
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
  const [users, setUsers] = useState([]);

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

  const getAllUsers = async () => {
    const resp = await fetch(`${baseUrl}/users`);
    const info = await resp.json();
    setUsers(info);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          textDecoration: "underline",
        }}
      >
        Admin Dashboard
      </h1>
      <div>
        <h3 style={{ marginLeft: "1rem", marginBottom: "0rem" }}>
          Add New Product:
        </h3>
        <form onSubmit={addProduct}>
          <TextField
            style={{ margin: "1rem" }}
            id="add-product-input"
            label="Name"
            value={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            style={{ margin: "1rem" }}
            id="add-product-input"
            label="Author"
            value={author}
            variant="outlined"
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <TextField
            style={{ margin: "1rem" }}
            id="add-product-input"
            label="Description"
            value={description}
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <TextField
            style={{ margin: "1rem" }}
            id="add-product-input"
            label="Price"
            value={price}
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <TextField
            style={{ margin: "1rem" }}
            id="add-product-input"
            label="Stock"
            value={quantity}
            variant="outlined"
            onChange={(e) => setQuantity(e.target.value)}
            required
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
              required
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
            required
          />
          <Button
            style={{ margin: "1rem", height: "56px" }}
            type="submit"
            variant="contained"
          >
            Add Product!
          </Button>
        </form>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
      <div>
        <h3
          style={{
            marginLeft: "1rem",
            marginBottom: "0rem",
            marginBottom: "1rem",
          }}
        >
          Users List:
        </h3>
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            size={"medium"}
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">ID No.</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="center">Admin?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.is_admin ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  //   count={rows.length}
                  rowsPerPage={10}
                  //   page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  //   onPageChange={handleChangePage}
                  //   ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Admin;
