const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/References');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'post'
    }]
})

module.exports =  mongoose.model("User",userSchema);