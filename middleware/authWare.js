const jwt = require('jsonwebtoken');
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'node-auth secret', (err, decodedToken) => {
            if (err) {
                console.log('error token after decoded');
                res.redirect('/login');
            } else {
                console.log('decoded token ', decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = { checkUser };