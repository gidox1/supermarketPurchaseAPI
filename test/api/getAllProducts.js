'use strict';

const config = require('../../app/config/config')
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const expect = require('chai').expect;

function connection() {  
    return new Promise ((resolve, reject) => {
        return mongoose.connect(config.mongodb.mongodb_host, { useNewUrlParser: true })
            .then((res, err) => {
                if(err) return reject(err);
                resolve(res)
            })
}) }


describe('Product /api/product', function() {
    this.timeout(3000);
    beforeEach(function(done) {
        connection()
            .then(function() { done()})
            .catch(function(err) { done(err)})
    })

    it('gets all products', function(done){
        request(app).get('/api/product/')
            .then(function(res){
                expect(200);
                done()
            })
            .catch(function(err){ done(err)});
    })
})
