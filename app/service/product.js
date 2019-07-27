'use strict';

const mongoose = require('mongoose');
const config = require('../config/config');
const productSchema = require('../model/schema/productSchema');
const ProductModel = new productSchema();

class Product {

    async create(payload) {
        const {name, price, quantity, tag} = payload;

        
        const check = await productSchema.find({name: name}).exec()
                    .then(result => {
                        console.log(result);
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
                month
            })
            return await Product.save().then(result => {
                return {
                    status: true,
                };
            })
            .catch(err => {
                console.log(err);
                return false;
            })
        }
    }

    
    async update(productId, payload) {
        console.log(productId, payload);
        return await productSchema.updateAll({_id: productId},{price: payload.price}, (err, res) => {
            if(err) console.log('An error occured', err);
            console.log(res);
        })
    }


    async delete(productId) {
        console.log(productId);
        return await productSchema.remove({_id: productId})
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
        return await productSchema.findById(productId)
            .exec()
            .then(result => {
                if(result === null) return false;
                console.log(result, 'Got product successfuly');
                return {status: true, body: result}
            })
            .catch(err => {console.log('an error occured', err)})
    }

}

module.exports = Product;