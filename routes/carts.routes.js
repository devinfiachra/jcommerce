const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

/* GET cart page */
router.get("/", (req, res, next) => {
  let cartItems = productsController.displayProductsInCart();
  let cartTotal = productsController.displayTotalPrice();

  console.log("total ", cartTotal);

  res.render("carts", { cartItems, cartTotal });
});

// router.get("/:id", productsController.getCartDetails);

router.post("/:id", productsController.addItemToCart);

module.exports = router;
