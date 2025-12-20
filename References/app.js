const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');



app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/create', async (req, res) => {
    let user = await userModel.create({
        name: "Noor",
        email: "nooo@gmail.com",
        age: 22
    })
    res.send(user);
})

app.get('/post/create', async (req, res) => {
    let post = await postModel.create({
        postData: "How Are oyu",
        user: '694624e1c3bdb7f179846eb7'
    })

    let user = await userModel.findOne({ _id: "694624e1c3bdb7f179846eb7" })
    user.posts.push(post._id);
    await user.save();
    res.send({post,user});
})

app.listen(3000);
console.log('Server is running on http://localhost:3000');