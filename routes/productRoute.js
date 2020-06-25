const {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  searchProduct,
} = require("../db/productDB");

const express = require("express");
const authentication = require("./authentication");
const adminCheck= require("./adminCheck");
const app = express.Router();
app.use(express.json());


app.get("/search/:name", (req, res) => {
  searchProduct(req.params.name)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});
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

app.post("/",[authentication,adminCheck] ,(req, res) => {
  createProduct(req.body)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.put("/:id", authentication,(req, res) => {
  updateProduct(req.body,req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.delete("/:id",[authentication,adminCheck] ,(req, res) => {
  deleteProduct(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});


module.exports = app;
