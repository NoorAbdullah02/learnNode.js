

const mongoose = require('mongoose');


const ownerSchema = mongoose.Schema({
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
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    Picture: String,
    gstin: String,
})

module.exports = mongoose.model("owner", ownerSchema);

