const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const ProfilePicturesSchema = new Schema({
  // userId: { type: String, required: true },
  imageUrl: { type: String, required: true, default: 'https://cdn.filestackcontent.com/A4HQjwJS92dJo0JghLyU'},
  imageName: { type: String, required: true, default: 'Default'},
  user: {type: mongoose.Schema.ObjectId, ref: 'Users'}

});

module.exports = mongoose.model('ProfilePicture', ProfilePicturesSchema, 'ProfilePictures');
