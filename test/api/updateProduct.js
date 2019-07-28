'use strict';

const expect = require('chai').expect;
const config = require('../../app/config/config')
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const shortId = require('shortid');

function connection() {  
    return new Promise ((resolve, reject) => {
        return mongoose.connect(config.mongodb.mongodb_host, { useNewUrlParser: true })
            .then((res, err) => {
                if(err) return reject(err);
                resolve(res)
            })
}) }


describe('Product /api/product/update', function() {
    const shortString = shortId.generate();

    this.timeout(5000);
    beforeEach(function(done) {
        connection()
            .then(function() { done()})
            .catch(function(err) { done(err)})
    })

    it('Updates a product', function(done){
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
                const _id = body['_id'];
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('name');
                expect(body).to.contain.property('price');
                expect(body).to.contain.property('quantity');

                request(app).get(`/api/product/:${_id}`)
                    .then(function(res){
                        const body = res.body;
                        const name = body.body.name;

                        request(app).post(`/api/product/update?${name}`)
                            .send({
                                name: `${name}`,
                                quantity: 5,
                                price: 30,
                                tag: 'food'
                            })
                            .then(function(res){
                                const body = res.body;
                                expect(200)
                                expect(body).to.contain.property('status');
                                done();
                            })
                    })
                done();
            })
    });
})
