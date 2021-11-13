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
import { makeStyles } from "@mui/styles";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import baseUrl from "../api";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  body: {
    backgroundColor: "#d1d7e0",
  },
  card: {
    height: "auto",
    backgroundColor: "#f7f9fb",
  },
});

const AllProducts = (props) => {
  const [books, setBooks] = useState([]);
  const [productId, setProductId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();

  const getAllBooks = async () => {
    const resp = await fetch(`${baseUrl}/products`);
    const info = await resp.json();
    setBooks(info);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  //   const addToCart = async (productId) => {
  //     const response = await fetch(`${baseUrl}/products`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${props.token}`,
  //       },
  //       body: {
  //         product_id: productId,
  //         quantity: 1,
  //       },
  //     });
  //     const info = await response.json();
  //     if (info.error) {
  //       console.log(info.error);
  //       return setErrorMessage(info.error);
  //     }
  //   };

  return (
    <body className={classes.body}>
      <h1>All Books</h1>
      <Container>
        <Grid container spacing={3} alignItems="center">
          {books.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={3}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/products/${book.id}`}
              >
                <Card raised className={classes.card}>
                  <CardContent>
                    <CardMedia>
                      <img
                        src={book.image}
                        style={{
                          height: "20em",
                          width: "14em",
                          display: "block",
                          marginLeft: "auto",
                          marginRigh: "auto",
                        }}
                      />
                    </CardMedia>
                  </CardContent>
                  <Typography
                    align="center"
                    variant="body2"
                    fontWeight="900"
                    color="#31708e"
                  >
                    {" "}
                    {book.name}
                  </Typography>
                  <Typography
                    align="right"
                    variant="subtitle1"
                    padding=".5em"
                    color="#31708e"
                  >
                    ${book.price}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </body>
  );
};

export default AllProducts;
