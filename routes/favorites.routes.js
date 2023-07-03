const router = require('express').Router();
const {postNewFavorite, getFavorites, postDeleteFavorite} = require("../controllers/favorites.controller.js");


router.post('/favorites/create', postNewFavorite);

router.get('/favorites', getFavorites);

router.post('/favorites/:favoritesId/delete', postDeleteFavorite);


module.exports = router;
