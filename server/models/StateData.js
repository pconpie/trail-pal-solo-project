const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema
const StateData = new Schema({
  states: Schema.Types.Mixed
});

module.exports = mongoose.model('States', StateData);
