'use strict';

// eslint-disable-next-line import/no-unresolved
const express = require('express');
const {StatusCodes} = require("http-status-codes");

const app = express();

app.use(express.json());

/*
app.use(express.urlencoded({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));
*/


app.get('/callback-logger', (req, res) => {

    console.log('Headers:', req.headers);
    console.log('Body: ', req.body);
    console.log('Body: ', req.query);
    console.log('Params:', req.params);

    const response = {
        message: 'Request logged successfully!'
    }

    res.status(StatusCodes.OK)
        .json(response);

    console.log(req.rawBody);
    console.log(req);

    res.on('finish', () => {
        console.log(res.getHeaders());
    })

});

// Error handler
app.use((err, res) => {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Serverless Error');
});

module.exports = app;
