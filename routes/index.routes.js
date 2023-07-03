const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const apiUrl = "https://fakestoreapi.com/products";
  console.log("called");
  fetch(apiUrl)
    .then((res) => res.json())
    .then((productsFromApi) => {
      console.log(productsFromApi);
      res.render("/views/products/products-list.hbs", {
        getProducts: productsFromApi,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("index");
});

module.exports = router;
