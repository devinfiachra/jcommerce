const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

/* GET home page */
router.get("/checkout", isLoggedIn, (req, res, next) => {
  const userCart = req.session.currentUser.carts;

  res.render("checkout", { userCart });
});

module.exports = router;
