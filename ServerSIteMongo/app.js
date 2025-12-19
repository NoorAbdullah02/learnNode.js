const express = require('express');

const app = express();

const path = require('path');

const usermodel = require('./models/user');

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
})


app.get('/read', async (req, res) => {
  let allusers =  await usermodel.find();
    res.render("read",{allusers: allusers});
})

app.post('/create', async (req, res) => {
    let { name, email, photo } = req.body;
    let createUser = await usermodel.create({
        name: name,
        email: email,
        photo: photo
    })
    if (!createUser) {
        console.log("Error in creating user");
    } else {
        res.send(createUser);
    }
})
app.listen(2000);