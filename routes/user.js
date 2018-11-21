
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user_model');
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');
// const exjwt = require('express-jwt');

const dotenv = require("dotenv/config");

/* const jwtMiddleware = exjwt({
    secret: process.env.TOKEN
})
 */



router.post('/signup', function(req, res, next) {
    User.find({ email: req.body.email})
        .exec()
        .then( user => {
            if (user.length >= 1)  {
                res.render('info', { info: "Your Mail already exists"});                
            } else {
                bcrypt.hash(req.body.password, null, null, function(err, hash) {
                    if(err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = new User ({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        })
                        user.save()
                            .then(function(result) {
                                console.log(result);
                                /* res.status(200).json({
                                    success: "New user has been created"
                                }); */
                                res.render('info', { info: "User Created sucessfully"});
                                /* res.status(code).json({
                                    error: err
                                }); */
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }     
                });
            }
        })

    
});


router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email})
    .exec()
    .then(function(user) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(err) {
                res.render('info', {info: "Unauthorized Access"})
            }   
            if(result) {
                const JWTTOKEN = jwt.sign({
                    email: user.email,
                    _id: user._id
                }, 
                process.env.TOKEN, 
                {
                    expiresIn: '36h',
                });
                // localStorage.setItem('token', JSON.stringify(JWTTOKEN));
                res.setHeader('Authorization', JWTTOKEN); 
                res.header('Authorization', JWTTOKEN);
                res.render("info", { info: `Here is your token: ${JWTTOKEN}`})
            }
            /* return res.status(401).json({
                failed: 'Unauthorized Access'
            }); */
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/', checkAuth, (req, res) => {
    res.send('You are authenticated');
})




module.exports = router;