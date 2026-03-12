const bcrypt = require('bcrypt');

// password hashing function
exports.hashPassword = (password)=>{
    return bcrypt.hashSync(password,10)
}

// password validation
exports.validatePassword = (password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword)
}