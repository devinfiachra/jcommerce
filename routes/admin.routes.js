const express = require("express");
const router = express.Router();

router.get("/admin/login", (req, res, next) => {
  res.render("admin/login");
});

router.get("/admin/dashboard", (req, res, next) => {
  res.render("admin/dashboard");
});

module.exports = router;
