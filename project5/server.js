//jshint esversion:6
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('login vth password');
});
app.get('/forgotpassword',(req,res)=>{
    res.render('login vth password');
});

app.listen(3000,()=>{
    console.log('Server running at port 3000');
});
