'use strict';

const ProductController = require('../controller/product');
const productController = new ProductController();
const allowed_keys = ['product_name', 'quantity', 'price'];
const ProductService = require('../service/product');
const productService = new ProductService();
const PurchaseController = require('../controller/purchase');
const purchaseController = new PurchaseController();

console.log('within utils');


module.exports = {
    productController,
    productService,
    purchaseController
}