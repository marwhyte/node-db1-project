const express = require("express");

const db = require("../data/dbConfig.js");

const AccountRouter = require("../accounts/accountRoutes");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to the api" });
});
module.exports = server;
