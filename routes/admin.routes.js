const express = require("express");
const router = express.Router();

router.get("/admin/login", (req, res, next) => {
  res.render("admin/login");
});

router.post("/admin/login", (req, res, next) => {
  res.redirect("/admin/dashboard");
});

module.exports = router;
