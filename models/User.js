const mongoose = require('mongoose');
const {isEmail} =require('Validator');
const bcrypt = require('bcrypt');

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
userSchema.post('save',function(data,next){
    next();
});

userSchema.pre('save',function(next){
    const saltRounds=8;
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        bcrypt.hash(this.password,salt,(error,hash)=>{
            this.password = hash;
            next();
        })
    })
})

const User = mongoose.model('user',userSchema);
module.exports = User;