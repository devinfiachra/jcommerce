const express = require("express");
const router = express.Router();

/* GET cart page */
router.get("/", (req, res, next) => {
  res.render("carts");
});

module.exports = router;
