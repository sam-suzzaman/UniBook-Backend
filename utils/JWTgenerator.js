const jwt = require("jsonwebtoken");

function JWTgenerator(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
}

module.exports = JWTgenerator;
