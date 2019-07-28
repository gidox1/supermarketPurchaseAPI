'use strict';

const PurchaseService = require('../service/purchase');
const purchaseService = new PurchaseService();

class Purchase {


    async purchaseProduct(req, res) {
        return purchaseService.createPurchase(req.body)
            .then(result => {
                return (result.status === true) ? res.status(200).json({status: 'success', message: result.message, body: result.body})
                    : res.status(409).json({status: 'error', message: result.message})
            })
            .catch(err => {
                console.log('An error occured');
            })
    }

    async getTransaction(req, res) {
        return purchaseService.getTransaction(req.params, req.query)
            .then(result => {
                return (result.status === true) ? res.status(200).json({status: 'success', body: result.body})
                    : res.status(409).json({status: 'error', message: result.message})
            })
            .catch(error => {
                console.log('An error occured', error);
            })
    }


    async getAllTransaction(req, res) {
        return await purchaseService.getAllTransaction()
            .then(result => {
                return (result.status === true) ? res.status(201).json({status: 'success', body: result.body})
                    : res.status(404).json({status: 'Product Not found'})
            })
            .catch(err => {
                console.log('Error Occured', error);
            })
    }
}

module.exports = Purchase;