const express = require('express') ;
const {login,register} = require('../controllers/authController');
const { loginValidation } = require('../middleware/loginValidationMiddleware');
const { registerValidation } = require('../middleware/registerValidationMiddleware');


const router = express.Router()

router.post('/register',registerValidation,register);
router.post('/login',loginValidation,login);

module.exports = router ;


