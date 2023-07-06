const mongoose = require("mongoose");

const Product = require("../models/Product.model.js");
const User = require("../models/User.model.js");
const mongoURI = process.env.MONGO_URI;

const getProducts = (req, res, next) => {
  Product.find()
    .then((allTheProductsFromDB) => {
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
  const userId = req.session.currentUser._id;

  console.log(productId);
  console.log(userId);

  // Product.findById(productId)
  //   .then((theProduct) => {
  //     return User.findByIdAndUpdate(userId, {
  //       $push: { carts: theProduct },
  //     });
  //     // cartItems.push(theProduct);
  //     // res.redirect("/carts");
  //   })
  Product.findById(productId)
    .then((theProduct) => {
      return User.findById(userId)
        .then((user) => {
          user.carts.push(theProduct);
          return user.save();
        })
        .then(() => {
          res.redirect("/carts");
        });
    })
    .catch((error) => {
      console.log("Error while fetching product from the DB: ", error);
      next(error);
    });
};

// last update
// const deleteItemFromCart = (req, res, next) => {
//   const productId = req.params.id;
//   const userId = req.session.currentUser._id;

//   User.findByIdAndUpdate(userId, { $pull: { carts: productId } })
//     .then(() => {
//       res.redirect("/carts");
//     })
//     .catch((error) => {
//       console.log("Error while deleting item from the cart: ", error);
//       next(error);
//     });
// };

const deleteItemFromCart = (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.session.currentUser._id;

  User.findByIdAndUpdate(userId, { $pull: { carts: productId } })
    .then(() => {
      // Ürünü başarılı bir şekilde sepetten kaldırdıktan sonra, güncellenmiş sepeti tekrar almak için kullanıcının verilerini getiriyoruz
      User.findById(userId)
        .populate("carts")
        .then((user) => {
          res.render("carts", { cartItems: user.carts });
        })
        .catch((error) => {
          console.log("Error while fetching user data: ", error);
          next(error);
        });
    })
    .catch((error) => {
      console.log("Error while deleting item from the cart: ", error);
      next(error);
    });
};

module.exports = {
  getProducts,
  getProductId,
  addItemToCart,
  displayProductsInCart,
  deleteItemFromCart,
};
