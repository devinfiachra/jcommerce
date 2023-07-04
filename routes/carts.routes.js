const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

/* GET cart page */
router.get("/", (req, res, next) => {
  let cartItems = productsController.displayProductsInCart();

  console.log("THE CART IN CART", cartItems);

  res.render("carts", { cartItems });
});

// router.get("/:id", productsController.getCartDetails);

router.post("/:id", productsController.addItemToCart);

module.exports = router;
