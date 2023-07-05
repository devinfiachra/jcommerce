const mongoose = require("mongoose");
const apiUrl = "https://fakestoreapi.com/products";

const Product = require("../models/Product.model.js");
const mongoURI = process.env.MONGO_URI;

const axios = require("axios");


const getNewProduct = (req, res) => res.render('admin/product-create.hbs');

const postNewProduct = (req, res, next) => {
  const { title, description, price, category, rating, image, quantity } = req.body;

  Product.create({ title, description, price, category, rating, image, quantity })
    .then(() => res.redirect('admin/dashboard'))
    .catch(error => next(error));
};

// new version with axios
//Böylece, getProducts fonksiyonu artık API'den veri alacak ve dönen veriyi konsolda gösterecektir. Daha sonra şablonla işlem yapmak için bu veriyi kullanabilirsiniz.
const getProducts = (req, res, next) => {
  axios
    .get(apiUrl)
    .then((response) => {
      const productsFromAPI = response.data;
      console.log("getproducts", productsFromAPI);
      res.render("products/products-list.hbs", {
        products: productsFromAPI,
      });
    })
    .catch((error) => {
      console.log("Error while fetching products from the API: ", error);
      next(error);
    });
};

const getAdminProducts = (req, res, next) => {
  axios
    .get(apiUrl)
    .then((response) => {
      const productsFromAPI = response.data;
      console.log("getproducts", productsFromAPI);
      res.render("admin/dashboard.hbs", {
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
      console.log("the product", theProduct);
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

const getEditProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then(productToEdit => {
      res.render('admin/product-edit.hbs', { product: productToEdit });
    })
    .catch(error => next(error));
};

const postEditProduct = (req, res, next) => {
  const { productId } = req.params;
  const { title, description, price, category, rating, image, quantity } = req.body;

  Product.findByIdAndUpdate(productId, { title, description, price, category, rating, image, quantity }, { new: true })
    .then(updatedProduct => res.redirect(`products/${updatedBook.id}`))
    .catch(error => next(error));
};

const postDeleteProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndDelete(productId)
    .then(() => res.redirect('admin/dashboard'))
    .catch(error => next(error));
};


module.exports = { getNewProduct, postNewProduct, getProducts, getAdminProducts, getProductId, getEditProduct, postEditProduct, postDeleteProduct };
