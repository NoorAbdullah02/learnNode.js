const mongoose = require('mongoose');


const userModel = mongoose.Schema({
    fullName: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    Picture: String
})

module.exports = mongoose.model("user", userModel);