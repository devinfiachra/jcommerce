const router = require('express').Router();
const {getFavorites, postDeleteFavorite} = require("../controllers/favorites.controller.js");


router.get('/favorites', getFavorites);

router.post('/favorites/:favoritesId/delete', postDeleteFavorite);


module.exports = router;
