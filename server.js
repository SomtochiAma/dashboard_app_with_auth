const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);

app.get("/checking", function(res, req) {
    res.json({
        "welcomeText": "Hello! Welcome to Fashionista"
    })
});

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});