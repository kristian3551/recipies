const jwt = require('jsonwebtoken');
const config = require('../config/config');
const secret = 'shhhhh';

function createToken(data) {
    return jwt.sign(data, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

module.exports = {
    createToken,
    verifyToken
}