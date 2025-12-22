require("dotenv").config();

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require("path");
const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const expressSession = require('express-session');
const flash = require('connect-flash');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SCRECT,  // ✅ FIXED!
    })
)

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});



app.get("/", (req, res) => {
    res.send("Hello")
})


app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);



app.listen(3000, () => {
    console.log("Server running on port 3000");
});