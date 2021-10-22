const { Client } = require("pg");
require("dotenv").config();

const client = new Client(
  process.env.DATABASE_URL || {
    user: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "grace-shopper",
    port: 5433,
  }
);

module.exports = client;
