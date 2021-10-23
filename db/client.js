const { Client } = require("pg");
require("dotenv").config();

const client = new Client(
  process.env.DATABASE_URL || {
    user: "postgres",
    password: "fullstack",
    database: "grace-shopper",
    port: 5433,
  }
);

client.connect();
module.exports = client;
