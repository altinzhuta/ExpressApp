const express = require("express");
const helmet = require("helmet");
const login = require("./routes/loginRoute");
const users = require("./routes/usersRoute");
const event = require("./routes/eventRoute");

function connectRouts(app) {
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use("/login", login);
  app.use("/users", users);
  app.use("/events", event);
}

module.exports = connectRouts;
