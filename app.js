const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");

process.env.DEBUG = "development";
const dev = require("debug")("development");

const login = require("./routes/loginRoute");
const users = require("./routes/usersRoute");
const event = require("./routes/eventRoute");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/localhost")
  .then(() => console.log("db connection....."))
  .catch((err) => console.error("connection failure:" + err.message));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use("/login", login);
app.use("/users", users);
app.use("/events", event);

dev("start up.....");
console.log(config.get("name"));

app.listen(3000, () => console.log("listening on 3000....."));
