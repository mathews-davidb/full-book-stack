import "./Components.css";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import baseUrl from "../api";
import { Link } from "react-router-dom";

const AllProducts = (props) => {
  const [books, setBooks] = useState([]);
  const [productId, setProductId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getAllBooks = async () => {
    const resp = await fetch(`${baseUrl}/products`);
    const info = await resp.json();
    setBooks(info);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const addToCart = async (productId) => {
    const response = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      body: {
        product_id: productId,
        quantity: 1,
      },
    });
    const info = await response.json();
    if (info.error) {
      console.log(info.error);
      return setErrorMessage(info.error);
    }
  };

  return (
    <>
      <h1>All Books</h1>
      <Container>
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={3}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/products/${book.id}`}
              >
                <Card raised>
                  <CardContent>
                    <CardMedia
                      component="img"
                      image={book.image}
                      // height='200px'
                    />
                    <br></br>
                    <Typography align="center"> {book.name}</Typography>
                    <Typography variant="subtitle2">
                      {" "}
                      {book.description}
                    </Typography>
                    <Typography align="right">${book.price}</Typography>
                    {/* <Typography> {book.stock}</Typography> */}
                  </CardContent>
                  <CardActions>
                    {/* <Button
                      size="small"
                      onClick={(e) => {
                        addToCart(book.id);
                      }}
                    >
                      Add to Cart
                    </Button> */}
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AllProducts;
