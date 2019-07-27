'use strict';

const mongoose = require('mongoose');
const transaction = require('../model/schema/transaction');
const productSchema = require('../model/schema/productSchema');
const months = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ]


class Purchase {


    async createPurchase(payload) {
        console.log(payload);

        const price =  await this.checkPrice(payload.product_name, payload.quantity);
        console.log(price);

        if(payload.amount < price) {
            return {
                status: false,
                message: 'Please supply the correct amount'
            }
        } else if (price.status === false) {
            return {
                status: false,
                message: price.message
            }
        } else {
            const log = this.logTransaction(payload);
            if(log) return {status: true,message: 'done'}
        }
    }



    async checkPrice(product_name, quantity) {
        return await productSchema.find({name: product_name})
            .then(result => {
                if(result === null || result.length < 1) return {status: false, message: "Product out of stock, check back later"}
                const price = result[0].price
                const newPrice = quantity * price
                return newPrice;
            })
            .catch(err => {
                console.log('An error occured', err)
            })
    } 

    //Log if it's a successful Purchase
    async logTransaction(payload) {
        const {product_name, amount, quantity} = payload;
        const month_string = await this.generateMonthId(new Date);
        const month = month_string.toLowerCase();

        const Transaction = new transaction({
                    id: new mongoose.Types.ObjectId(),
                    product_name, 
                    amount,
                    quantity,
                    month
        })
        return Transaction.save()
                .then(result => {
                    return {
                        status: true,
                    };
                })
                .catch(err => {
                    console.log(err);
                    return false;
                })
    }

    async getTransaction(fromMonth, name) {
        console.log(fromMonth, name)
        return transaction.find({name: name, month: fromMonth})
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log('Error => ', err)
            })
    }


    async getAllTransaction() {
        return transaction.find()
            .exec()
            .then(result => {
                if(result === null || result.length < 1) return false;
                console.log(result, 'Got Transaction successfuly');
                return {status: true, body: result}
            })
            .catch(err => {console.log('an error occured', err)})
    }

    async generateMonthId(timeString) {
        const str = JSON.stringify(timeString)
        const timeArray = str.split("-");
        const index = parseInt(timeArray[1],10) - 1;
        const month = months[index];
        return month;
    }

}

module.exports = Purchase;