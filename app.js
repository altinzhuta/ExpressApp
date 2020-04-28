const express = require("express");
const app = express();
const config = require("config");
process.env.DEBUG = "development";
const dev = require("debug")("development");
const mongoose = require("mongoose");
require("./routs")(app);

mongoose
  .connect(config.get("mongodb"))
  .then(() => dev(`db connection with: ${config.get("mongodb")}`))
  .catch((err) => dev("connection failure:" + err.message));

dev("Server is connected:" + config.get("name"));
app.listen(3000, () => dev(`listening on ${config.get("serverPort")}.....`));
