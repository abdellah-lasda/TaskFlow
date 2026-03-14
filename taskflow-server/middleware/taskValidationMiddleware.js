
const taskValidation = async (req,res,next)=>{
    try{
        const {Title,Description,Priority,Status,Due_Date} = req.body ;
        let errors = {};
        if(!Title){
            errors = { ...errors ,'Title':"Title is required"}
        }
        if(!Description){
            errors = { ...errors , 'Description':"Description is required"};
        }
        if(Priority){
            if(Priority !== "Low" && Priority !== "High" && Priority !== "Medium"){
                errors = { ...errors , 'Priority':"Invalide Priority"};
            }
        }
        if(Status){
            if(Status !== "Pending" && Status !== "Completed" ){
                errors = { ...errors , 'Status':"Invalide Status"};
            }
        }

        if(Due_Date){
            const date = new Date(Due_Date)
            if (isNaN(date.getTime())) {
                errors = { ...errors , 'Due_Date':"Invalide Date"};
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