const express = require('express');

const app = express();

const userModel = require('./usermodel');
console.log(userModel);

app.get('/', (req, res) => {
    res.send("Hello WOrld");
})

app.get('/create', async (req, res) => {
    let createUser = await userModel.create({
        name: "Noor Sheikj",
        age: "249",
        email: "noor@gmail.com"
    })
    res.send(createUser);
})

app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({
        name: "Noor"
    },
        { name: "Noor ABdullah" },
        { new: true }
    );
    if(!updatedUser){
        console.log("User not found");
        return res.status(404).send("User not found");
    }
    else{
    res.send(updatedUser);
    console.log("Updated");
    }
})

app.get('/read', async (req, res) => {
    let userRead = await userModel.find();
    res.send(userRead);
})

app.get('/delete', async (req,res)=>{
    let deleteUser = await userModel.findOneAndDelete({name:"Noor ABdullah"});

    if(!deleteUser){
        console.log("User not found for deletion");
        return res.status(404).send("User not found for deletion");
    }
    else{
    res.send(deleteUser);
    console.log("Deleted Successfully");
    }
})


app.listen(2000);