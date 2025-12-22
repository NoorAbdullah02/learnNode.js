const jwt = require('jsonwebtoken');
const userModel = require("../models/user_model");

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        res.flash("Error, You Need to Login First!");
        return res.redirect('/');
    }
    try {
        let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
            .findOne({ email: decode.email })
            .select(-password);

        req.user = user;
        next();
    } catch (err) {
        req.falsh("Error!", "Something Went Wrong");
        res.redirect("/");
    }
}