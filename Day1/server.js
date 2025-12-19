// const http = require('http');

// const server = http.createServer(function(req, res){
// res.end("Hello from backend server");
// })

// server.listen(3000);


const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(function(req , res, next){
    console.log("Middleware called");
    next();
})

app.get('/',function(req,res){
    res.send("I am the Imran Hasmi");
})

app.get('/profile',function(req,res){
    res.send("I am the Abdullah");
})

app.listen(3000);







