const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_EXPIRY });
};

module.exports = {
    createToken,
};