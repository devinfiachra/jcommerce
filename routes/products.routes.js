// module.exports = router;
const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controller");

router.get("/:productId", productsController.getProductId);

router.get("/", productsController.getProducts);

//last update
router.delete("/:productId", productsController.deleteItemFromCart);

module.exports = router;
