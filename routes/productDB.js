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
async function createProduct(req) {
  const productName = await Product.find({ name: req.name });
  console.log(productName);
  return new Promise((result, reject) => {
    if (!productName[0])
      result(
        new Product({
          name: req.name,
          stock: req.stock,
          rating: req.rating,
          price: req.price,
        }).save()
      );
    else reject(new Error("Already there, did you mean to update?"));
  });
}

async function getProduct(id) {
  const product = await Product.findById(id);
  return new Promise((result, reject) => {
    if (product) result(product);
    else reject(new Error("Product not found"));
  });
}

async function getAllProducts() {
  const products = await Product.find({});
  return new Promise((result, reject) => {
    if (products.length > 0) result(products);
    else reject(new Error("No Products"));
  });
}
async function deleteProduct(id) {
  const oldProduct = await Product.find({ id });
  return new Promise((result, reject) => {
    if (oldProduct) result(Product.findByIdAndRemove(id));
    else reject(new Error("error deleting Product"));
  });
}
async function updateProduct(req, id) {
  const product = await Product.findById(id);
  return new Promise((result, reject) => {
    if (product)
      result(
        Product.findByIdAndUpdate(
          id,
          {
            $set: {
              name: req.name,
              stock: req.stock,
              price: req.price,
              rating: req.rating,
            },
          },
          { new: true }
        )
      );
    else reject(new Error("Error updating"));
  });
}

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
