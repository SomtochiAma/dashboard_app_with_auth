const express = require('express');
const router = express.Router();
const user = require('../routes/user')
const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
    let token = req.headers['Authorization'];
    //It logs undefined
    console.log(req.body.token);
    /*  even when I input the token through a form and console.log(req.body.token)*/
    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        req.userData = decoded;
        return res.status(401).json({
            message: "You are authenticated",
        })
    } catch(error) {
        return res.status(401).json({
            message: "Auth Failed"
        });
    }

}