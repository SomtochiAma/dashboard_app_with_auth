const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup')
});

router.get('/signup', function(req, res, next) {
    res.render('signup')
});



module.exports = router