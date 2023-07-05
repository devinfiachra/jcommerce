const express = require("express");
const router = express.Router();


router.get("/admin/login", (req, res, next) => {
  res.render("admin/login");
});

// router.get("/admin/dashboard", (req, res, next) => {

//   console.log("data should be displayed here")
//   res.render("admin/dashboard");
// });

router.post("/admin/login", (req, res, next) => {
  console.log(req.body);
  res.redirect("/admin/dashboard");
});


module.exports = router;
