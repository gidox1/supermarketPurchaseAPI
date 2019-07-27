'use strict';

const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const route = require('./app/route/route');
const db = require('./app/db');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', route);

app.get('*', (req, res) => {
    return res.send({
        status: 200,
        message: 'Healthy'
    })
})

const server = http.createServer(app);

server.listen(port, (err) => {
    if(err) return false;
    console.log(`Nodemon is keeping me alive on port ${port} ...  ¯\\_(ツ)_/¯ `);
})