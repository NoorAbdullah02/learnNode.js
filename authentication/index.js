const express = require('express');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');

const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {

    res.render("index");
})





app.post('/create', async (req, res) => {
    try {
        const { username, email, password, age } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const createdUser = await userModel.create({
            username,
            email,
            password: hash,
            age
        });

        let token = jwt.sign({ email }, "shoooo");
        res.cookie("token", token);


        res.send(createdUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("User creation failed");
    }
});


app.get('/login', (req,res)=>{
    res.render("login");
})

app.post('/login', async(req,res)=>{
   let user = await userModel.findOne({email: req.body.email});
   if(!user)return res.status(404).send("Something went Wrong");

   bcrypt.compare(req.body.password, user.password, (err, result)=>{
    
    if(result){
        const { email } = req.body;
        let token = jwt.sign({ email }, "shoooo");
        res.cookie("token", token);
        return res.send("Login Successful");
    }
    if(err)return res.status(500).send("Internal Server Error");
    if(!result)return res.status(401).send("Password is incorrect");
    res.send("You Can Login");
   })
})

app.get('/logout', (req,res)=>{
     res.cookie("token","");
     res.redirect('/');
})


app.listen(3000);



