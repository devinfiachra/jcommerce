const Favorite = require('../models/Favorite.model.js');


const postNewFavorite = (req, res, next) => {
  const { product, user } = req.body;

  Favorite.create({ product, user })
    .then(() => res.redirect('/favorites'))
    .catch(error => next(error));
};

const getFavorites = (req, res, next) => {
  Favorite.find()
    .then(allTheFavoritesFromDB => {
      console.log('Retrieved favorites from DB:', allTheFavoritesFromDB);

      res.render('favorites/favorites-list.hbs', { favorites: allTheFavoritesFromDB });
    })
    .catch(error => {
      console.log('Error while getting the favorites from the DB: ', error);

      next(error);
    });
};

const postDeleteFavorite = (req, res, next) => {
  const { favoriteId } = req.params;

  Favorite.findByIdAndDelete(favoriteId)
    .then(() => res.redirect('/favorites'))
    .catch(error => next(error));
};


module.exports = {postNewFavorite, getFavorites, postDeleteFavorite};
