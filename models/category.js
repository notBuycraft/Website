const config = require("../config.json");
let mongoose = require('mongoose');
let autopopulate = require('mongoose-autopopulate');

// Define schema for `user` database collection
let CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    enabled: Boolean
});

// Load plugin to automatically populate nested queries
CategorySchema
    .plugin(autopopulate);

let Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
