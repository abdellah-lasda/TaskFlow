const UserModel = require('../models/User') ;
const {validatePassword,hashPassword} = require('../services/passwordService')
const {generateToken} = require('../services/tokenService')


exports.login = async (req,res)=>{
    try{
        const {Email,Password} = req.body
        const user = await  UserModel.findOne({Email});
        if(!user){ return res.json({"success":false,"errors":{'message':'Invalid email'}})}

        const valid = await validatePassword(Password,user.Password) 
        if(!valid){ return res.json({"success":false,"errors":{'message':'Invalid email or password.'}})}

        const userId = user._id ;
        const token = await generateToken(userId) ;
        res.json({token,"success":true}) ;
    }catch(err){
        res.status(500).json({"message":"l'authentification est échoué"})
    }
}


exports.register = async (req,res)=>{
    try{
        const {Email,Password,Name} = req.body
        const userExists = await UserModel.findOne({Email}) ;
        if(userExists) return res.json({"success":false,"errors":{'message':"email alredy exists"}});

        const passwordHash = await hashPassword(Password) ;
        const user = await new UserModel({Name,Email,Password:passwordHash});
        await user.save();

        res.json({"success":true,"message":"user created succesfuly"})
    }catch(err){
        res.status(500).json({"message":`Authentification are feild ${err} `})
    }
}

