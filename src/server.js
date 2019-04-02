const express = require("express");
const server = express();

server.use(express.json());
server.use(require("./routes"));

module.exports = server;
