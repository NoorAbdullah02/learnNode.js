const express = require('express');
// const cookieParser = require('cookie-parser');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// app.use(cookieParser());

app.get('/', (req, res) => {
    // res.cookie("name","Noor");
    // res.send("Cookie is set");

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return console.error(err);
        }
        bcrypt.hash("polololollll", salt, function (err, hash) {
            if (err) {
                return console.error(err);
            }
            console.log(hash);
        });
    });

    let token = jwt.sign({ email: "noor@gmail.com" }, "secret");
    res.cookie("token", token);
    console.log(token);

})

// app.get('/read',(req,res)=>{
//     console.log(req.cookies);
//     res.send("Cookie Read Successfully");
// })

app.listen(2000);

