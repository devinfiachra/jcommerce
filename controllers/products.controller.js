const Product = require('../models/Product.model.js');


const getProducts = (req, res, next) => {
  Product.find()
    .then(allTheProductsFromDB => {
      console.log('Retrieved products from DB:', allTheProductsFromDB);

      res.render('products/products-list.hbs', { products: allTheProductsFromDB });
    })
    .catch(error => {
      console.log('Error while getting the products from the DB: ', error);

      next(error);
    });
};

const getProductId = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((theProduct) => {
      console.log(theProduct)
      res.render('products/product-details.hbs', { product: theProduct })})
    .catch(error => {
      console.log('Error while retrieving product details: ', error);

      next(error);
    });
};


module.exports = {getProducts, getProductId}
