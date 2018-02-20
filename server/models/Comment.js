const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const CommentsSchema = new Schema({
  trailName: { type: String, required: true },
  trailID: { type: String, required: true },
  trailLat: { type: String, required: true },
  trailLon: { type: String, required: true },
  comment: {type: String, required: true},
  dateAdded: {type:Date, default: Date.now},
  userPicture: Schema.Types.Mixed,
  user: {type: mongoose.Schema.ObjectId, ref: 'Users'}
});

module.exports = mongoose.model('Comment', CommentsSchema, 'Comments');
