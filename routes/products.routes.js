
const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controller");


router.get('/admin/create', productsController.getNewProduct);

router.post('/admin/create', productsController.postNewProduct);

router.get("/", productsController.getProducts);

router.get("/admin/dashboard", productsController.getAdminProducts);

router.get("/:productId", productsController.getProductId);

router.get('/admin/:productId/edit', productsController.getEditProduct);

router.post('/admin/:productId/edit', productsController.postEditProduct);

router.post('/admin/:productId/delete', productsController.postDeleteProduct);


module.exports = router;
