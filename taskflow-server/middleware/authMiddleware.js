const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config/env");
const UserModel = require('../models/User')


// verify the token jwt
const protect = async (req, res, next) => {
  try {
    // in the front end we send a request with { headers:{ Authorization: `Bearer ${token} } }`
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // store the token jwt  
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, jwtSecret);


    // check if the user still exists in the database
    const user = await UserModel.findById(decoded.id);
    if (!user) {
        return res.status(401).json({ message: "User no longer exists" });
    }
    // store the user information 
    req.user = user ;
    next();
  } catch (error) {
        // JsonWebTokenError: invalid signature
        // TokenExpiredError: jwt expired
        return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
module.exports =  protect ;