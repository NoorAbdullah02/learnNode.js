const express = require('express');

const router = express.Router();

const { logOut , registerUser, loginUser } = require('../controllerts/authController')


router.get("/", (req, res) => {
    res.send("hey working");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/register", (req, res) => {
    res.render("signup");
})

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logOut)

module.exports = router;