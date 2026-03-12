
exports.loginValidation = async (req,res,next)=>{
    const {Email,Password} = req.body
    
    let errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    if(!Email){
        errors = { ...errors , 'email':"l'email est obligatoire !"};
    }
    else if(!regex.test(Email)){
        errors = { ...errors ,'email':"l'email est invalide !"}
    }

    if(!Password){
        errors = { ...errors ,'password':"le mot de passe est obligatoire !"}
    }
    else if (Password.length < 8){
        errors = { ...errors ,'password':"le mot de passe doit contien au moin 8 chars !"}
    }

    if(Object.keys(errors).length > 0){
        return res.json({errors,"success":false})
    }

    next();

}
