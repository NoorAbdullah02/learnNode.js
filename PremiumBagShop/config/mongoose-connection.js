const mongoose = require('mongoose');
const config = require("config");

const dbug = require("debug")("development:mongoose");

mongoose.connect(`${config.get("MONGO_URL")}/book_shop`)
    .then(function () {
        dbug("Connected!");
    })
    .catch(function (err) {

        console.log(err);
    })


module.exports = mongoose.connection;