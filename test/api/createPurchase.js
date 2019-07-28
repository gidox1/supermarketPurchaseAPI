'use strict';

const expect = require('chai').expect;
const config = require('../../app/config/config')
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');

function connection() {  
    return new Promise ((resolve, reject) => {
        return mongoose.connect(config.mongodb.mongodb_host, { useNewUrlParser: true })
            .then((res, err) => {
                if(err) return reject(err);
                resolve(res)
            })
}) }


describe('Product /api/purchase', function() {
    this.timeout(5000);
    beforeEach(function(done) {
        connection()
            .then(function() { done()})
            .catch(function(err) { done(err)})
    })

    it('creates a new Purchase', function(done){
        setTimeout(done, 300);
        request(app).post('/api/purchase')
            .send({
                "product_name": "meat",
                "amount": 2000,
                "quantity": 1
            })
            .then(function(res){
                expect(200)
            })
            .catch(function(err){ done(err)});
    });
})
