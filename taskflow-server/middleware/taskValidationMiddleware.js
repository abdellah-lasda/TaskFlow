
const taskValidation = async (req,res,next)=>{
    try{
        const {Title,Description,Priority,Status,Due_Date} = req.body ;
        let errors = {};
        if(!Title){
            errors = { ...errors ,'Title':"le titre est obligatoire !"}
        }
        if(!Description){
            errors = { ...errors , 'Description':"la description est obligatoire !"};
        }
        if(Priority){
            if(Priority !== "Low" && Priority !== "High" && Priority !== "Medium"){
                errors = { ...errors , 'Priority':"Priority est Invalide !"};
            }
        }
        if(Status){
            if(Status !== "Pending" && Status !== "Completed" ){
                errors = { ...errors , 'Status':"Status est Invalide !"};
            }
        }

        if(Due_Date){
            const date = new Date(Due_Date)
            if (isNaN(date.getTime())) {
                errors = { ...errors , 'Due_Date':"Date est Invalide !"};
            }
        }
        
        if(Object.keys(errors).length > 0){
            return res.json({errors,"success":false})
        }

        next();
    }catch(err){
        res.status(500).json({'message':err})
    }

}

module.exports = taskValidation ;