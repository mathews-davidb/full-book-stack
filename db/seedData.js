const client = require("./client");

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
    name VARCHAR(255) UNIQUE NOT NULL,
    );
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      price DECIMAL NOT NULL,
      stock INT NOT NULL,
      category VARCHAR REFERENCES categories(id) ON DELETE CASCADE,
    );
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin DEFAULT false
      );
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      is_purchase DEFAULT false,
    );
    CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        UNIQUE(product_id, order_id),
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

client.connect();
dropTables();
createTables();
seedValues();
