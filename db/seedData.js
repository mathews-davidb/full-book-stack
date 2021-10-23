const client = require("./client");
const { createOrder } = require("./orders");
const { createProduct } = require("./products");
const { createUser, getUser } = require("./users");

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
      description VARCHAR(255) NOT NULL,
      price DECIMAL NOT NULL,
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
  const categories = [
    { name: "history" },
    { name: "fiction" },
    { name: "non-fiction" },
  ];

  for (let category of categories) {
    await client.query(
      `
    INSERT INTO categories (name) VALUES ($1)
  `,
      [category.name]
    );
  }
}

createUser({ email: "email@email.com", name: "name", password: "password" });
createUser({ email: "email2@email.com", name: "name2", password: "password" });
createProduct({
  name: "name3",
  description: "this is a book",
  price: 10.99,
  stock: 100,
  category: "non-fiction",
}).then(console.log);
createOrder(1);

dropTables();
createTables();
seedValues();

console.log("working");
