const express = require('express');

const router = express.Router();

const upload = require("../config/multer-config");

router.get("/", upload.single("image"),(req,res)=>{
    res.send("hey working");
})

module.exports = router;