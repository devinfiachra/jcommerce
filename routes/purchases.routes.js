const router = require('express').Router();
const {getPurchases, getPurchaseId} = require("../controllers/purchases.controller.js");


router.get('/purchases', getPurchases);

router.get('/purchases/:purchaseId', getPurchaseId);


module.exports = router;
