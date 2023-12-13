const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.name = 'API';

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://drivers-slw9.vercel.app'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

server.use(router);

module.exports = server;
