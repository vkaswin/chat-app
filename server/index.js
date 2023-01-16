const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const routes = require("./routes");
const socket = require("./socket");
const port = process.env.PORT;

connectDB();

const app = express();

const server = require("http").createServer(app);

socket.init(server);

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(routes);

server.listen(port, () => {
  console.log(`server connected on port ${port}`);
});
