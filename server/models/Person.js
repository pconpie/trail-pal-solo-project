const mongoose = require('mongoose');
const Favorites = require('../models/Favorite');
const Schema = mongoose.Schema;

// Mongoose Schema
const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  // favorites: [Favorites]
});

module.exports = mongoose.model('Person', PersonSchema);
