const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const isLoggedOut = require("../middleware/isLoggedOut");
const User = require("../models/User.model.js");
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET cart page */
router.get("/", isLoggedIn, (req, res, next) => {
  const userId = req.session.currentUser._id;

  User.findById(userId)
    .populate("carts") // carts dizisindeki öğelerin ayrıntılarını almak için populate kullanın
    .exec()
    .then((user) => {
      const cartItems = user.carts;
      res.render("carts", { cartItems });
    })
    .catch((error) => {
      console.log("Error while fetching user data: ", error);
      next(error);
    });
});

router.post("/:id", isLoggedIn, productsController.addItemToCart);

// last update
// router.delete("/:productId", isLoggedIn, productsController.deleteItemFromCart);

module.exports = router;
