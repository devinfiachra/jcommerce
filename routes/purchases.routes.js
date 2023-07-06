const router = require("express").Router();
const {
  postNewPurchase,
  getPurchases,
  getPurchaseId,
} = require("../controllers/purchases.controller.js");

router.post("/purchases/create", postNewPurchase);

router.get("/purchases", getPurchases);

router.get("/purchases/:purchaseId", getPurchaseId);

module.exports = router;
