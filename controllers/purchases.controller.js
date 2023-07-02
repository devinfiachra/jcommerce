const Purchase = require('../models/Purchase.model.js');


const getPurchases = (req, res, next) => {
  Purchase.find()
    .then(allThePurchasesFromDB => {
      console.log('Retrieved purchases from DB:', allThePurchasesFromDB);

      res.render('purchases/purchases-list.hbs', { purchases: allThePurchasesFromDB });
    })
    .catch(error => {
      console.log('Error while getting the purchases from the DB: ', error);

      next(error);
    });
};

const getPurchaseId = (req, res, next) => {
  const { purchaseId } = req.params;

  Purchase.findById(purchaseId)
    .then(thePurchase => res.render('purchases/purchase-details.hbs', { purchase: thePurchase }))
    .catch(error => {
      console.log('Error while retrieving purchase details: ', error);

      next(error);
    });
};


module.exports = {getPurchases, getPurchaseId}
