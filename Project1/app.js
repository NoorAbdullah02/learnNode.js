const express = require('express');

const app = express();

const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/login', (req, res) => {
    res.render("login");
}) 

app.get('/profile', isLoggedIn, async (req, res) => {
    
    let user = await userModel.findOne({email:req.user.email}).populate("posts");
 
     res.render("profile", {user});
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    
    let post = await postModel.findOne({_id: req.params.id}).populate("user");

    if(post.likes.indexOf(req.user.userId) === -1){
 post.likes.push(req.user.userId);
    }
   else{
    post.likes.splice(post.likes.indexOf(req.user.userId));
   }
    await post.save();
    res.redirect("/profile");
    console.log(req.user);
})

app.post('/post', isLoggedIn, async (req, res) => {
    
    let user = await userModel.findOne({email:req.user.email});
    
    let {content} = req.body;
    
   let post = postModel.create({
        user: user._id,
        content: content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
})




app.post('/register', async (req, res) => {
    let { username, name, email, password, age } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("User ALready Registeded");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let newUser = userModel.create({
        username,
        name,
        age,
        email,
        password: hash
    })

    let token = jwt.sign({ email: newUser.email, userId: newUser._id }, "noor");
    res.cookie("token",token);
    res.send("Register Done!");
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("Something went Wrong");

    const match = await bcrypt.compare(password, user.password);
    if (match) {
        let token = jwt.sign({ email: user.email, userId: user._id }, "noor");
        res.cookie("token", token);
        res.redirect("/profile");
    }
    else res.redirect("/login");
})


app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
})

// function isLoggedIn(req, res, next) {
//     if (req.cookies.token === "") res.send("You Must be Login First");
//     else {
//         let data = jwt.verify(req.cookies.token, "noor");
//         req.data = data;
//         next();
//     }

// }


function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, "noor");
        req.user = decoded; // ✅ standard practice
        next();
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
}





app.listen(3000);