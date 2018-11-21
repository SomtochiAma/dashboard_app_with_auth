const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/jwtauth");

const user = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('User', user);