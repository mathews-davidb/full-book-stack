const client = require("./client");
const { createOrder } = require("./orders");
const { createProduct } = require("./products");
const { createUser, getUser } = require("./users");
const { createCategory } = require("./categories");

const faker = require("faker");
const axios = require("axios");

async function dropTables() {
  try {
    await client.query(`
    DROP TABLE IF EXISTS cart_items;  
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;  
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    await client.query(`
    CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255),
      author VARCHAR(255) NOT NULL,
      price DECIMAL NOT NULL,
      image VARCHAR(255),
      stock INTEGER NOT NULL,
      category VARCHAR(255) REFERENCES categories(name) ON DELETE CASCADE
    );
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT false
      );
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      is_purchase BOOLEAN DEFAULT false
    );
    CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        product_name VARCHAR(255) REFERENCES products(name),
        price DECIMAL NOT NULL,
        quantity INTEGER NOT NULL,
        UNIQUE(product_id, order_id)
      );
    `);
  } catch (error) {
    throw error;
  }
}

async function seedValues() {
  for (i = 0; i < 10; i++) {
    const name = faker.name.findName();
    const email = (
      name.split(" ")[0] +
      "." +
      name.split(" ")[1] +
      "@email.com"
    ).toLowerCase();
    createUser({ email: email, name: name, password: "password" });
  }
}

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const seedProducts = async () => {
  try {
    await axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=bYXKRa8vHpJZn0WEWdSrD1pK74e6AjEp"
      )
      .then(async (response) => {
        const categories = response.data.results;
        for (let category of categories) {
          // console.log(category.display_name);
          await sleep(10000);
          createCategory(category.display_name);
          axios
            .get(
              `https://api.nytimes.com/svc/books/v3/lists/${category.list_name_encoded}.json?api-key=bYXKRa8vHpJZn0WEWdSrD1pK74e6AjEp`
            )
            .then(async (response) => {
              const books = response.data.results.books;
              for (let book of books) {
                const price =
                  (Math.floor(Math.random() * (2500 - 1500 + 100)) + 1500) /
                  100;
                createProduct({
                  name: book.title,
                  description: book.description,
                  price: price,
                  stock: 100,
                  category: category.display_name,
                  author: book.author,
                  image: book.book_image,
                });
                console.log("success");
              }
            });
        }
      });
  } catch (error) {
    throw error;
  }
};

seedProducts();
dropTables();
createTables();
seedValues();

console.log("working");
