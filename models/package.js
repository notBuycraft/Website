const config = require("../config.json");
let mongoose = require('mongoose');
let autopopulate = require('mongoose-autopopulate');

// Define schema for `user` database collection
let PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: Number,
    description: String,
    enabled: Boolean,
    commands: Map
});

// Load plugin to automatically populate nested queries
PackageSchema
    .plugin(autopopulate);

let Package = mongoose.model('Package', PackageSchema);

module.exports = Package;
