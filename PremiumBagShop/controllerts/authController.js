
const userModel = require("../models/user_model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken")

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        let check = await userModel.findOne({ email: email });
        if (check) return res.status(401).send("Account is Already Regiatered!")

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname, email, password: hash
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("User Created Successfull");
                }
            })
        })

    } catch (err) {
        res.send(err.message);

    }
}

module.exports.loginUser = async (req, res) => {

    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(500).send("Email or pass incorrect");
    } else {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.send("You can login");
            }else{
                 return res.status(500).send("Email or pass incorrect");
            }
        })
    }

}

module.exports.logOut = async (req,res)=>{
    res.cookie("token", "");
    res.redirect("/");
};