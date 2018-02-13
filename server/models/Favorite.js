const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const FavoritesSchema = new Schema({
  favoriteName: { type: String, required: true },
  favoriteID: { type: String, required: true },
  favoriteLat: { type: String, required: true },
  favoriteLon: { type: String, required: true },
  explored: {type: Boolean, default: false},
  user: {type: mongoose.Schema.ObjectId, ref: 'Users'},

});

module.exports = mongoose.model('Favorite', FavoritesSchema, 'Favorites');
