const mongoose = require("mongoose");

const Product = require("../models/Product.model.js");
const mongoURI = process.env.MONGO_URI;

const getProducts = (req, res, next) => {
  Product.find()
    .then((allTheProductsFromDB) => {
      console.log("Retrieved books from DB:", allTheProductsFromDB);
      res.render("products/products-list.hbs", {
        products: allTheProductsFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while fetching products from the DB: ", error);
      next(error);
    });
};

const getProductId = (req, res, next) => {
  const { productId } = req.params;

  // Product.findById(productId)
  //   .then((theProduct) => {
  //     console.log(theProduct)
  //     res.render('products/product-details.hbs', { product: theProduct })})
  //   .catch(error => {
  //     console.log('Error while retrieving product details: ', error);

  Product.findById(productId)
    .then((theProduct) =>
      res.render("products/product-details.hbs", { product: theProduct })
    )
    .catch((error) => {
      console.log(
        "Error while retrieving product details from the DB: ",
        error
      );
      next(error);
    });
};

let cartItems = [];

const displayProductsInCart = () => {
  return cartItems;
};

const addItemToCart = (req, res, next) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((theProduct) => {
      cartItems.push(theProduct);
      res.redirect("/carts");
    })
    .catch((error) => {
      console.log("Error while fetching product from the DB: ", error);
      next(error);
    });
};

module.exports = {
  getProducts,
  getProductId,
  addItemToCart,
  displayProductsInCart,
};
