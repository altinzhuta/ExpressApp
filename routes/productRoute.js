const {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("./productDB");

const express = require("express");
const app = express.Router();
app.use(express.json());

app.get("/:id", (req, res) => {
  getProduct(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.get("/", (req, res) => {
  getAllProducts()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.post("/", (req, res) => {
  createProduct(req.body)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.put("/:id", (req, res) => {
  updateProduct(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.delete("/:id", (req, res) => {
  deleteProduct(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = app;
