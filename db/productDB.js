const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  stock: Number,
  rating: Number,
  price: Number,
});

const Product = mongoose.model("product", productSchema);

//
async function createProduct(req) {
  const productName = await Product.find({ name: req.name });
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
async function searchProduct(sname){
  const productQuery= await Product.find({name: { $regex: sname }});
  
  return new Promise((result,reject)=>{
    if(productQuery.length>0) result((productQuery));
    else reject(new Error("no product"));
  })


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
  const oldProduct = await Product.findById( id );
  return new Promise((result, reject) => {
    if (oldProduct) result(Product.findByIdAndRemove(id));
    else reject(new Error("error deleting Product"));
  });
}
async function updateProduct(req, id) {
  let product = await Product.findById(id);
  let keys= Object.keys(req);

  return new Promise((result, reject) => {
    if (!product) reject(new Error("Error updating document in DB"));
    else
    for( let key of keys ){
      if(key!=null&&req[key]!=1&&req[key]!=""){
        product[key]=req[key];
        
      }else if(key=="stock"&&req.stock==1){
       
        product[key]--;
      }
    }
      result(product.save())
      
  });
}

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  searchProduct,
  productSchema
};
