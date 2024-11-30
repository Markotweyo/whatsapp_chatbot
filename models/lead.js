const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    budget: Number,
    propertyType: String,
    location: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema);
