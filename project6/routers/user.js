const express = require('express');
const signin = require('../models/signinandsignout')
const routes = express.Router();


routes.post('/', async (req, res) => {

    const {name,email,password} = req.body;
    const ProLog = await signin.create({
        name,
        email,
        password
    });

    return res.status(201).json({
        message: 'successfully Login',
        yourProduct: ProLog
    });

});

module.exports = routes;