const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.set('view engine','ejs');
const url ='mongodb+srv://ag:test1234@nodecluster.nqf64.mongodb.net/myFirstDatabase';
mongoose.connect(url).then((result)=>{
    console.log(result);
    console.log("result");
}).catch((err)=>{
    console.log(err);
    console.log("error");
})
app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/receipt',(req,res)=>{
    res.render('home');
})
app.listen(8080);