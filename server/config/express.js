const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const secret = 'secret';

module.exports = (app) => {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }))
      app.use(bodyParser.json())
    app.use(cors({
      exposedHeaders: 'Authorization'
    }));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cookieParser(secret));
};