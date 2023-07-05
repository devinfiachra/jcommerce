const mongoose = require("mongoose");

const Product = require("../models/Product.model.js");
const mongoURI = process.env.MONGO_URI;

const axios = require("axios");

const getNewProduct = (req, res) => res.render("admin/product-create.hbs");

const postNewProduct = (req, res, next) => {
  const { title, description, price, category, rating, image, quantity } =
    req.body;

  Product.create({
    title,
    description,
    price,
    category,
    rating,
    image,
    quantity,
  })
    .then(() => res.redirect("/admin/dashboard"))
    .catch((error) => next(error));
};

const getProducts = (req, res, next) => {
  Product.find()
    .then((allTheProductsFromDB) => {
      console.log("Retrieved products from DB:", allTheProductsFromDB);
      res.render("products/products-list.hbs", {
        products: allTheProductsFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while fetching products from the DB: ", error);
      next(error);
    });
};

const getAdminProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log("Retrieved products from DB:", products);
      res.render("admin/dashboard", {
        products,
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

const getEditProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((productToEdit) => {
      res.render("admin/product-edit.hbs", { product: productToEdit });
    })
    .catch((error) => next(error));
};

const postEditProduct = (req, res, next) => {
  const { productId } = req.params;
  const { title, description, price, category, rating, image, quantity } =
    req.body;

  Product.findByIdAndUpdate(
    productId,
    { title, description, price, category, rating, image, quantity },
    { new: true }
  )
    .then((updatedProduct) => res.redirect(`products/${updatedBook.id}`))
    .catch((error) => next(error));
};

const postDeleteProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndDelete(productId)
    .then(() => res.redirect("/admin/dashboard"))
    .catch((error) => next(error));
};

module.exports = {
  addItemToCart,
  displayProductsInCart,
  getNewProduct,
  postNewProduct,
  getProducts,
  getAdminProducts,
  getProductId,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
