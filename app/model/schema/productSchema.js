'use strict';

const mongoose = require('mongoose');

const Product = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    tag: String,
    created_at: { 
        type : Date, 
        default: Date.now 
    },
})

module.exports = mongoose.model('Product', Product);