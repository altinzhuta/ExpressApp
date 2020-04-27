const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const { userSchema } = require("./userDB");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const User = mongoose.model("users", userSchema);
app.use(express.json());

app.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  const validPassword = await bcrypt.compare(
    req.body.password,
    user.passwordHash
  );
  if (!validPassword) return res.status(400).send("Wrong credentials");
  const token = jwt.sign({ _id: user._id }, config.get("webTokenSalt"));
  res.header("x-token", token).send(user);
});

module.exports = app;
