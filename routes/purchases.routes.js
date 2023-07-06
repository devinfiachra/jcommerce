const router = require('express').Router();
const {getNewPurchase, postNewPurchase, getPurchases, getPurchaseId} = require("../controllers/purchases.controller.js");

router.get("/checkout", getNewPurchase);

router.post('/success', postNewPurchase);

router.get('/purchases', getPurchases);

router.get('/purchases/:purchaseId', getPurchaseId);


module.exports = router;
