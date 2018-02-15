const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    trailName: {
        type: String,
        required: false
    },
    trail: {
        type: String,
        required: false
    },
    comment: {
        type: String
    }
    
})

module.exports = schema;