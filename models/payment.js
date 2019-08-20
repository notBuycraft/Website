const config = require("../config.json");
let mongoose = require('mongoose');
let autopopulate = require('mongoose-autopopulate');

// Define schema for `user` database collection
let PaymentSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        unique: true,
        required: true
    },
    package: String,
    gateway: String,
    status: {
        type: String,
        enum: ['pending', 'completed'],
    },
    date: Date,
    username: String,
    uuid: String,
    email: String,
    paid_price: Number,
    normal_price: Number,
    ip_address: String
});

// Load plugin to automatically populate nested queries
PaymentSchema
    .plugin(autopopulate);

let Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
