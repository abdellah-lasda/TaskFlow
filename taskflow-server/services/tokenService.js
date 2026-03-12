const jwt = require("jsonwebtoken");
const {jwtSecret,jwtExpiresIn} = require('../config/env') 

// generate a json web token 
exports.generateToken = (userId) => {
  return jwt.sign(
    { id: userId },    // payload
    jwtSecret,         // secret key
    { expiresIn: jwtExpiresIn } // expires time
  );
};

// verify the token jwt
exports.verifyToken = (token) => {
  return jwt.verify(token,jwtSecret)
};
