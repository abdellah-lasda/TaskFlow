
exports.loginValidation = async (req,res,next)=>{
    const {Email,Password} = req.body
    
    let errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    if(!Email){
        errors = { ...errors , 'email':"Email is required"};
    }
    else if(!regex.test(Email)){
        errors = { ...errors ,'email':"Invalide email"}
    }

    if(!Password){
        errors = { ...errors ,'password':"Password is required"}
    }
    else if (Password.length < 8){
        errors = { ...errors ,'password':"Password must be at least 8 characters"}
    }

    if(Object.keys(errors).length > 0){
        return res.json({errors,"success":false})
    }

    next();

}
