const jwt = require('jsonwebtoken');
const { createError } = require('../utils/customError');


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log('token: ', token);
    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }

    jwt.verify(token, 'shhhhh', (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid!"))
        }
        req.user = user;
        next()
        // console.log(user)
    });
};
module.exports = { verifyToken }