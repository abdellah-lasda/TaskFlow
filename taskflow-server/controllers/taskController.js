const TaskModel = require('../models/Task')


// fetch the user tasks
exports.getUserTasks = async (req,res)=>{
    const User_reference = req.user._id ;
    const tasks = await TaskModel.find({User_reference});
    res.json(tasks);
}


// fetching an user task
exports.getTask = async (req,res)=>{
    const User_reference = req.user._id ;
    const _id = req.params.id
    try{
        const task = await TaskModel.findOne({User_reference,_id});
        if(!task) return res.status(404).json({'message':"task not found or is not one of your tasks"});
        return res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({'message':` fetching a user task transaction are failed ${err}`})
    }
    
}


// create new task
exports.createTask = async (req,res)=>{
    // after the midlleware validation
    // the user is exist and have a valide token => can create a task
    try{
        const User_reference = req.user.id ;
        const {Title,Description,Priority} = req.body ;
        const newTask = await new TaskModel({Title,Description,Priority,User_reference})
        await newTask.save() ;
        res.status(201).json({"success":true,'message':`task added succesfuly `})
    }catch(err){
        res.status(500).json({"success":true,'message':`add task transaction are failed ${err}`})
    }

}


// update task
exports.updateTask = async (req,res)=>{
    // after the midlleware validation
    // the user is exist and have a valide token => can update a task

    const {Title,Description,Status,Priority} = req.body ;
    const User_reference = req.user.id ;
    const _id = req.params.id

    try{
        const task = await TaskModel.findOne({User_reference,_id});
        
        if(!task) return res.status(404).json({'message':"task not found or is not one of your tasks"});
        
        task.Title = Title ;
        task.Description = Description ;
        task.Status = Status;
        task.Priority = Priority;
    
        await task.save()

        res.status(200).json({"success":true,'message':`task updated succesfuly `})
    }catch(err){
        res.status(500).json({'message':`update task transaction are failed ${err.message}`})
    }
}


// Mark Task as Completed
exports.markTaskCompleted = async (req,res)=>{
    // after the midlleware validation
    // the user is exist and have a valide token => can mark task as completed
    const User_reference = req.user.id ;
    const _id = req.params.id

    try{
        const task = await TaskModel.findOne({User_reference,_id});
        if(!task) return res.status(404).json({'message':"task not found or is not one of your tasks"});
        task.Status = "Completed";
        task.Due_Date = new Date().toLocaleString();

        await task.save()

        res.status(200).json({'message':`task marked completed succesfuly `})
    }catch(err){
        res.status(500).json({'message':`task marked completed transaction are failed ${err.message}`})
    }
}


// delete task 
exports.deleteTask = async (req, res) => {
    try{

        const User_reference = req.user.id;
        const _id = req.params.id;

        const deletedTask = await TaskModel.findOneAndDelete({_id,User_reference});

        if (!deletedTask) {
            return res.status(404).json({message: "Task not found or not one of your tasks"});
        }

        return res.status(200).json({message: "Task deleted successfully"});

    }catch(err){
        return res.status(500).json({"message": `Delete task failed: ${err.message}`})
    }
};


// fetch user tasks with filter 
exports.filterUserTasks = async (req,res)=>{
    const User_reference = req.user.id;
    try{
        const {status,priority,title} = req.query
        const limitNumber = Number(req.query.limit || 20);
        const pageNumber = Number(req.query.page || 1);

        
        const page = pageNumber > 0 ? pageNumber : 1;
        const limit = limitNumber > 0 && limitNumber <= 50 ? limitNumber : 10;
        const skip = (page - 1) * limit;
        
        const filter = {User_reference}

        if(status){
            filter.Status = status ;
        } 
        if(priority){
            filter.Priority = priority ;
        } 
        if(title){
            filter.Title = { $regex: title, $options: "i" }
        }   


        const tasks = await TaskModel.find(filter).sort({Due_Date:-1}).skip(skip).limit(limit) ;
        const totalTasks = await TaskModel.countDocuments(filter) ;
        const totalPages = Math.ceil(totalTasks / limit) ;
        const currentPage = Number(page)

        return res.status(200).json({tasks,totalTasks,totalPages,currentPage})
    }
    catch(err){
        return res.status(500).json({'message':`fetching user tasks transaction are failed ${err}`})
    }
}

// fetch statistiques générales
exports.UserTasksStatistiques = async (req,res)=>{
    try{
        const User_reference = req.user.id;
        
        const total = await TaskModel.countDocuments({
            User_reference
        });

        const completed = await TaskModel.countDocuments({
            User_reference,
            Status: "Completed"
        });

        const pending = await TaskModel.countDocuments({
            User_reference,
            Status: "Pending"
        });

        const hight = await TaskModel.countDocuments({
            User_reference,
            Priority: "High"
        });

        return res.status(200).json({
            total,
            completed,
            pending,
            hight
        });

    } catch (err) {
        return res.status(500).json({
            message: `Failed to fetch statistics ${err}`
        });
    }    
}





 



