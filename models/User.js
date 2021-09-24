const mongoose = require('mongoose');
const {isEmail} =require('Validator');

const userSchema =new mongoose.Schema({
    email :{
        type:String,
        required:[true,"Email Field is Required"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Password Field is Required"],
        minlength:[6,"Minimum password Length is 6"]
    }
});

const User = mongoose.model('user',userSchema);
module.exports = User;