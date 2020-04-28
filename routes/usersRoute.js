const {
  getUserFromDB,
  getUsersFromDB,
  deleteFromDB,
  updateInDB,
  createUserInDB,
} = require("./userDB");

const express = require("express");
const authentication = require("./authentication");
const adminCheck = require("./adminCheck");
const app = express.Router();

app.use(express.json());

app.get("/:id", (req, res) => {
  getUserFromDB(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.get("/", (req, res) => {
  getUsersFromDB()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.post("/", authentication, (req, res) => {
  createUserInDB(req.body)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.put("/:id", authentication, (req, res) => {
  updateInDB(req.body, req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.delete("/:id", [authentication, adminCheck], (req, res) => {
  deleteFromDB(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});
app.get("/:id/profil", authentication, (req, res) => {
  if (req.user._id) res.send(req.user._id);
});

module.exports = app;
