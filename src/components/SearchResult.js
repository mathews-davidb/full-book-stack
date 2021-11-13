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
  card: {
    height: "auto",
    backgroundColor: "#f7f9fb",
  },
});

const SearchResult = (props) => {
  const [books, setBooks] = useState([]);
  const [productId, setProductId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();

  const searchProducts = async () => {
    const url = `${baseUrl}${window.location.pathname}`;
    console.log(url);
    const resp = await fetch(url);
    const info = await resp.json();
    setBooks(info);
  };

  useEffect(() => {
    searchProducts();
    console.log("working");
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>All Books</h1>
      {!books && <div>No results for this search.</div>}
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
    </>
  );
};

export default SearchResult;
