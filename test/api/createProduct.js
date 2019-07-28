'use strict';

const expect = require('chai').expect;
const config = require('../../app/config/config')
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const shortId = require('shortid');

// const app = new Product();

function connection() {  
    return new Promise ((resolve, reject) => {
        return mongoose.connect(config.mongodb.mongodb_host, { useNewUrlParser: true })
            .then((res, err) => {
                if(err) return reject(err);
                resolve(res)
            })
}) }


describe('Product /api/product', function() {
    const shortString = shortId.generate();

    this.timeout(3000);
    beforeEach(function(done) {
        connection()
            .then(function() { done()})
            .catch(function(err) { done(err)})
    })

    it('creates a new product', function(done){
        setTimeout(done, 300);
        request(app).post('/api/product')
            .send({
                name: `fridge${shortString}`,
                quantity: 3,
                price: 20,
                tag: 'food'
            })
            .then(function(res){
                const body = res.body;
                expect(200);
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('name');
                expect(body).to.contain.property('price');
                expect(body).to.contain.property('quantity');
                done();
            })
    });
})
