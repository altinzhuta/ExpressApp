const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const { userSchema } = require("../db/userDB");
const mongoose = require("mongoose");
const User = mongoose.model("users", userSchema);
app.use(express.json());

app.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("No user found");
  const validPassword = await bcrypt.compare(
    req.body.password,
    user.passwordHash
  );
  if (!validPassword) return res.status(400).send("Wrong credentials");
  const token = user.generateAuthToken();
  res.setHeader("x-token", token);
  res.send(user);
});

module.exports = app;
