//jshint esversion:6
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const userRouter = require('./routes/userRouter');
const userModel = require('./models/userSchema');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "thisissecret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://Truptee:Truptee123@cluster0.u3q7n.mongodb.net/Userslogs", {
    useNewUrlParser: true
});

passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.post('/', (req, res) => {
    const userno = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        mobile: req.body.mobile,
        typeOfPerson: req.body.typeOfPerson
    });
    userModel.register(userno, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            const data = {};
            data.user = req.user;
            console.log(user);
            res.render('registration', {
                user
            });
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/citizen');
            });
        }
    });
});
app.post('/login',(req,res)=>{
    const userno = new userModel({
        username:req.body.username,
        password:req.body.password
    });
    req.login(userno,(err)=>{
        if(err)
        console.log(err);
        else
        {
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/citizen');
            });
        }
    });
});
app.get('/citizen', (req, res) => {
    if (req.isAuthenticated()) {
        // const data ={};
        // data.user = req.user;
        res.render('test');
    } else {
        res.redirect('/');
    }
});
app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});
app.get('/', (req, res) => {
    res.render('login vth password');
});
app.get('/forgotPass', (req, res) => {
    res.render('forgot password');
});
app.get('/forgotUsername', (req, res) => {
    res.render('forgot username');
});
app.get('/registration', (req, res) => {
    res.render('registration');
});

app.listen(3000, () => {
    console.log('Server running at port 3000');
});