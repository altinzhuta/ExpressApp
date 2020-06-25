const express = require("express");
const helmet = require("helmet");
const login = require("./routes/loginRoute");
const users = require("./routes/usersRoute");
const event = require("./routes/eventRoute");
const products = require("./routes/productRoute");
const stories = require("./routes/storyRoute");


function connectRouts(app) {
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use("/api/login", login);
  app.use("/api/users", users);
  app.use("/api/events", event);
  app.use("/api/products", products);
  app.use("/api/stories", stories);
 
}

module.exports = connectRouts;
