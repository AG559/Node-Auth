const express = require('express');
const mongoose = require('mongoose');
const authRoutes =require('./routes/authRoute');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
const url = 'mongodb+srv://ag:test1234@nodecluster.nqf64.mongodb.net/node-auth';
mongoose.connect(url,{useNewUrlParser:true})
    .then(() => app.listen(8080))
    .catch(err => console.log(err));

app.get('/', (req, res) =>res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);