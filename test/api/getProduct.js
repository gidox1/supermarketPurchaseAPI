'use strict';

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


describe('Product /api/product', function() {
    const shortString = shortId.generate();

    this.timeout(5000);
    beforeEach(function(done) {
        connection()
            .then(function() { done()})
            .catch(function(err) { done(err)})
    })

    it('Get Product ', function(done){
        request(app).post('/api/product')
        .send({
            name: `Tuna${shortString}`,
            quantity: 3,
            price: 20,
            tag: 'food'
        })
        .then(function(res){
            const body = res.body.body;
            const _id = body['_id'];
            request(app).get(`/api/product/:${_id}`)
                .then(function(res){
                    expect(200);
                    done()
            })
            done();
        })
    })
})
