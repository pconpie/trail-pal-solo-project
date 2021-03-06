const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const ImagesSchema = new Schema({
  trailId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageName: { type: String, required: true },
  user: {type: mongoose.Schema.ObjectId, ref: 'Users'}

});

module.exports = mongoose.model('Image', ImagesSchema, 'Images');
