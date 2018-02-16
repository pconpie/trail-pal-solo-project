const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const FavoritesSchema = new Schema({
  faveTrailInfo: Schema.Types.Mixed,
  explored: { type: Boolean, default: false},
  user: { type: String, required: true}
});

module.exports = mongoose.model('Favorite', FavoritesSchema, 'Favorites');
