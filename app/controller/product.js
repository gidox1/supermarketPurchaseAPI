'use strict';

const lodash = require('lodash');
const allowed_keys = require('../config/utils').allowed_keys;
const productSchema = require('../model/schema/productSchema');
const mongoose = require('mongoose');
const ProductService = require('../service/product')
const productService = new ProductService();


class Product {

    constructor() {
        this.productService = productService
    }


    async create(req, res) {
        return await productService.create(req.body)
            .then(result => {
                console.log('the result =>', result)
                return (result.status === true) ? res.status(200).json({status: 'success', message: 'Product successfully created'})
                    : res.status(409).json({status: 'error', message: 'Product Already Exists'})
            })
            .catch(error => {
                console.log('Error Occured', error);
            })
    }   

    async getAllProduct(req, res) {
        return await productService.getAllProduct()
            .then(result => {
                return (result.status === true) ? res.status(201).json({status: 'success', body: result.body})
                    : res.status(404).json({status: 'Product Not found'})
            })
            .catch(err => {
                console.log('Error Occured', error);
            })
    }
    

    async getProduct(req, res) {
        const {productId} = req.params;
        return await productService.getProduct(productId)
            .then(result => {
                return (result.status === true) ? res.status(201).json({status: 'success', body: result.body})
                    : res.status(404).json({status: 'Product Not found'})
            })
            .catch(err => {
                console.log('Error Occured', error);
            })
    }
    
    
    async update(req, res) {
        const {productId} = req.params;
        return await productService.update(productId, req.body)
            .then(result => {
                return (result.status === true) ? res.status(201).json({status: 'success', message: 'Product Successfully Updated'})
                    : res.status(404).json({status: 'Product Not found'})
            })
            .catch(err => {

            })
    } 

    async delete(req, res) {
        const {productId} = req.params
        return await productService.delete(productId)
            .then(result => {
                return (result.status === true) ? res.status(201).json({status: 'success', message: 'Product Successfully Deleted'})
                    : res.status(404).json({status: 'Product Not found'})
            })
            .catch(err => {

            })    
    }

}

module.exports = Product;