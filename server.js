const express = require("express");

const db = require("./data/dbConfig.js");

const accountRouter = require("./accounts/account-Router.js");
const logger = require("./middleware/logger.js");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/api/accounts", accountRouter);

server.get("/", (req, res) => {
  res.send("<h1>Server is working!</h1>");
});

module.exports = server;
