'use strict';

const mongoose = require('mongoose');
const productSchema = require('../model/schema/productSchema');
const hex = /[0-9A-Fa-f]{6}/g;
const ObjectId = require('mongodb').ObjectID;



class ProductClass {

    async create(payload) {
        const {name, price, quantity, tag} = payload;

        const check = await productSchema.find({name: name}).exec()
                    .then(result => {
                        if(result === null || result.length < 1) {return true} else {return false};
                    })

        if(check === false) {
            return false;
        }
        else {
            const Product = new productSchema({
                id: new mongoose.Types.ObjectId(),
                name, 
                price,
                quantity,
                tag,
            })
            return await Product.save().then(result => {
                return {
                    status: true,
                    result, result
                };
            })
            .catch(err => {
                console.log(err);
                return false;
            })
        }
    }

    
    async update(product_name, payload) {
        const price = payload.price;
        return await productSchema.update({name: product_name},{price: price, quantity: payload.quantity})
                .then(res => {
                    console.log('success')
                    return {
                        status: true
                    }
                })
                .catch(err => {
                    console.log('An error occured')
                })
    }


    async delete(productId) {
        const  product_id = mongoose.Types.ObjectId(productId)
        return await productSchema.remove({_id: product_id})
            .exec()
            .then(result => {
                if(result === null) return false;
                console.log(result, 'deleted')
                return {status: true}
            })
            .catch(err => {
                console.log('could not update', err);
            })
    }


    async getAllProduct() {
        return await productSchema.find()
            .exec()
            .then(result => {
                if(result === null || result.length < 1) return false;
                console.log(result, 'Got product successfuly');
                return {status: true, body: result}
            })
            .catch(err => {console.log('an error occured', err)})
    }


    async getProduct(productId) {
        const product_id = (hex.test(productId))? ObjectId(productId) : productId;
        return await productSchema.findById(product_id)
            .exec()
            .then(result => {
                if(result === null) return false;
                return {status: true, body: result}
            })
            .catch(err => {console.log('an error occured', err)})
    }

}

module.exports = ProductClass;