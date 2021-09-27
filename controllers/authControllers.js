const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge = 1000 * 60 * 60 * 24;

const handleError = (err) => {
    console.log(err.code);
    let errors = { 'email': '', 'password': '' };
    if (err.message === 'Incorrect Email') {
        errors.email = err.message;
        return errors;
    }

    if (err.message === 'Incorrect Password') {
        errors.password = err.message;
        return errors;
    }

    if (err.code == 11000) {
        errors.email = 'This email is already register';
        return errors;
    }
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}
const creatToken = (id) => {
    return jwt.sign({ id }, 'node-auth secret', { expiresIn: maxAge });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create(req.body);
        const token = creatToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, expiresIn: maxAge });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = creatToken(user._id);
        res.cookie('jwt',token,{maxAge,httpOnly:true})
        res.status(201).json({ user:user._id });
    } catch (err) {
        const errors = handleError(err);
        res.status('400').json({ errors });
    }
}

module.exports.logout = (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}