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
import img from "../components/media/library3.jpeg";

function ccyFormat(num) {
  return `${Number(num).toFixed(2)}`;
}

const useStyles = makeStyles({
  card: {
    height: "auto",
    backgroundColor: "#f7f9fb",
  },
});

const ProductCategory = (props) => {
  const [books, setBooks] = useState([]);
  const [productId, setProductId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();

  const getBooksbyCategory = async () => {
    const url = `${baseUrl}${window.location.pathname}`;
    console.log(url);
    const resp = await fetch(url);
    const info = await resp.json();
    setBooks(info);
  };

  useEffect(() => {
    getBooksbyCategory();
  }, []);

  let categoryName = window.location.pathname;
  categoryName =
    categoryName.substring(19).charAt(0).toUpperCase() +
    categoryName.substring(19).slice(1);
  categoryName = categoryName.toString().replace(/%20/g, " ");
  let words = categoryName.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== "and") {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    } else {
      words[i] = words[i];
    }
  }
  categoryName = words.join(" ");

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "repeat",
        minHeight: "84vh",
        height: "100%",
        zIndex: "-2",
        marginTop: "-3em",
      }}
    >
      <br></br>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "satisfy",
          fontSize: "3em",
          fontWeight: "700",
          marginTop: "1em",
        }}
      >
        {categoryName}
      </h1>
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
                    <CardMedia
                      component="img"
                      height="340em"
                      image={
                        book.image.includes("http")
                          ? book.image
                          : `/images/${book.image}`
                      }
                      alt={book.name}
                    />
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
                    ${ccyFormat(book.price)}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProductCategory;
