const express = require("express");
const helmet = require("helmet");
const login = require("./routes/loginRoute");
const users = require("./routes/usersRoute");
const event = require("./routes/eventRoute");
const products = require("./routes/productRoute");
//const stories = require("./routes/storyRoute");

function connectRouts(app) {
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use("/login", login);
  app.use("/users", users);
  app.use("/events", event);
  app.use("/products", products);
  // app.use("/stories", stories);
}

module.exports = connectRouts;
