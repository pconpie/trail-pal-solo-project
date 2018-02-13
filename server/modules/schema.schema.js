const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    message: {
        type: String
    }
    
})

module.exports = schema;