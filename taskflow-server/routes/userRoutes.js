const express = require('express') ;
const {fetchUserInfo} = require("../controllers/userController");
const protect = require('../middleware/authMiddleware');
const router = express.Router()

router.get('/',protect,fetchUserInfo);

module.exports = router ;


