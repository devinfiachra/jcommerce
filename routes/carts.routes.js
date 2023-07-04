const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

/* GET cart page */
router.get("/", (req, res, next) => {
  res.render("carts");
});

// router.get("/:id", productsController.getCartDetails);

router.post("/:id", productsController.getCartDetails);

module.exports = router;
