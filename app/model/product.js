'use strict';

const mongoose = require('mongoose');
const schema = require('./schema/productSchema');
const db = require('../db');

const Product = mongoose.model('Product', schema);

insert = async (payload) => {
    console.log(payload)
    const data = await new Product({payload}).save();
    if(!data) {return false}
    return true;
}

module.exports = {
    insert
}