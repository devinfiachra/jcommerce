const express = require("express");
const router = express.Router();

const apiUrl = "https://fakestoreapi.com/products";

/* GET /products page */
router.get("/", (req, res, next) => {
  // console.log olarak array object dokumentasyondan
  //   fetch(apiUrl)
  //     .then((res) => res.json())
  //     .then((json) => console.log(json[5]));
  fetch(apiUrl)
    .then((res) => res.json())
    .then((productsFromApi) => {
      res.render("products", {
        products: productsFromApi,
      });
    })
    // .then((productsFromApi) => {
    //   res.render("products", {
    //     products: { productsFromApi },
    //   });
    // })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
