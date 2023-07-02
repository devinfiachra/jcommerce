const router = require('express').Router();
const {getProducts, getProductId} = require("../controllers/products.controller.js");


router.get('/products', getProducts);

router.get('/products/:productsId', getProductId);


module.exports = router;
