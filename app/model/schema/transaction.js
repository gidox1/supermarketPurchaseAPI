'use strict';

const mongoose = require('mongoose');

const Purchase = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    product_name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    created_at: { 
        type : Date, 
        default: Date.now 
    },
    month: {type: String, required: true}
})

module.exports = mongoose.model('Purchase', Purchase);