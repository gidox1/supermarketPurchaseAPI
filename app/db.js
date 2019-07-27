'use strict';

const config = require('./config/config');
const mongoose = require('mongoose');
mongoose.connect(config.mongodb.mongodb_host, { useNewUrlParser: true });
const connection = mongoose.connection;

//DB Settings
connection.once('open', function(){
    console.log('Connected to mongodb');
})
connection.on('error', function(err){
    // console.log(err);
});

module.exports = connection;