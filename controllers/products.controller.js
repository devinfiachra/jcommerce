const mongoose = require("mongoose");
const apiUrl = "https://fakestoreapi.com/products";

const Product = require("../models/Product.model.js");
const mongoURI = process.env.MONGO_URI;

const axios = require("axios");

// new version with axios

const getProducts = (req, res, next) => {
  axios
    .get(apiUrl)
    .then((response) => {
      const productsFromAPI = response.data;
      // console.log("getproducts", productsFromAPI);
      res.render("products/products-list.hbs", {
        products: productsFromAPI,
      });
    })
    .catch((error) => {
      console.log("Error while fetching products from the API: ", error);
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

  axios
    .get(`${apiUrl}/${productId}`)
    .then((response) => {
      const theProduct = response.data;
      // console.log("the product", theProduct);
      res.render("products/product-details.hbs", { product: theProduct });
    })
    .catch((error) => {
      console.log(
        "Error while retrieving product details from the API: ",
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

  axios
    .get(apiUrl + "/" + productId)
    .then((response) => {
      const product = response.data;
      // console.log("getCartDetails", product);
      cartItems.push(product);
      // res.render("carts", { product });
      res.redirect("/carts");
    })
    // .then(() => {
    //   res.redirect(``);
    // })
    .catch((error) => {
      console.log("Error while fetching product from the API: ", error);
      next(error);
    });
};

module.exports = {
  getProducts,
  getProductId,
  addItemToCart,
  displayProductsInCart,
};
