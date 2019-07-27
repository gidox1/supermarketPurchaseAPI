'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../config/utils').productController;
const purchaseController = require('../config/utils').purchaseController;

router.post('/product', (req, res) => productController.create(req, res));

router.get('/product/', (req, res) => productController.getAllProduct(req, res));

router.post('/product/:productId', (req, res) => productController.update(req, res));

router.get('/product/:productId', (req, res) => productController.getProduct(req, res));

router.delete('/product/:productId', (req, res) => productController.delete(req, res));

router.post('/purchase', (req, res) => purchaseController.purchaseProduct(req, res)); 

router.get('/purchase', (req, res) => purchaseController.getAllTransaction(req, res)); 

router.get('/purchase/getTransaction/:month', (req, res) => purchaseController.getTransaction(req, res));

router.get('/', (req, res) => {
    res.status(200).json({
            status: 200,
            message: 'Healthy'
    })
})

module.exports = router;