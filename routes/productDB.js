const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  stock: Number,
  rating: String,
  price: Number,
});

const Product = mongoose.model("product", productSchema);

//
async function createProduct(req) {}

async function getProduct(id) {}

async function getAllProducts() {}
async function deleteProduct(id) {}
async function updateProduct(req, id) {}

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
