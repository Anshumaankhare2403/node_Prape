const express = require('express');
const product = require('../models/productschemas');
const routes = express.Router();

routes.post('/', async (req, res) => {

    const pro = req.body;

    const count = await product.countDocuments();
    console.log("Total products:", count);

    const Prosubmit = await product.create({
        id: count + 1,
        img: pro.img,
        title: pro.title,
        contand: pro.contand
    });

    return res.status(201).json({
        message: 'Product added successfully',
        yourProduct: Prosubmit
    });

});

routes.post('/ragistration', async (req, res) => {

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
