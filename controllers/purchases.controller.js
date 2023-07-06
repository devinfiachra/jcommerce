const Purchase = require("../models/Purchase.model.js");


const getNewPurchase = (req, res) => {res.render("checkout.hbs")};

const postNewPurchase = (req, res, next) => {
  let { name, street, city, country } = req.body;
  console.log(req.body);
  let user = req.session.currentUser
  console.log("User Cookie: ", user)

  let shippingAddress = {
    name: name,
    street: street,
    city: city,
    country: country
  };
  let price = 689;
  Purchase.create({ user, price, shippingAddress })
    .then(() => res.render("success.hbs"))
    .catch((error) => next(error));
};

const getPurchases = (req, res, next) => {
  Purchase.find()
    .then((allThePurchasesFromDB) => {
      console.log("Retrieved purchases from DB:", allThePurchasesFromDB);

      res.render("purchases/purchases-list.hbs", {
        purchases: allThePurchasesFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting the purchases from the DB: ", error);

      next(error);
    });
};

const getPurchaseId = (req, res, next) => {
  const { purchaseId } = req.params;

  Purchase.findById(purchaseId)
    .then((thePurchase) =>
      res.render("purchases/purchase-details.hbs", { purchase: thePurchase })
    )
    .catch((error) => {
      console.log("Error while retrieving purchase details: ", error);

      next(error);
    });
};

module.exports = { getNewPurchase, postNewPurchase, getPurchases, getPurchaseId };
