const dotenv = require("dotenv").config();

const express = require("express");
const server = express();

const client = require("./db/client");
client.connect();

const cors = require("cors");
server.use(cors());

server.use(express.json());
const jwt = require("jsonwebtoken");

const apiRouter = require("./api");

server.use("/api", apiRouter);

//==========================================================

server.listen(process.env.PORT || 3000, () => {
  console.log("The server is up");
});
