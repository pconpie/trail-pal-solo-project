const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema
const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  userFullName: { type: String },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Person', PersonSchema);
