const express = require('express');
const {createTask,getUserTasks,getTask,updateTask,deleteTask,markTaskCompleted,filterUserTasks, UserTasksStatistiques} = require('../controllers/taskController')
const Router = express.Router()
const protect = require('../middleware/authMiddleware');
const taskValidation = require('../middleware/taskValidationMiddleware')

Router.post('/add',protect,taskValidation,createTask);
Router.get('/',protect,getUserTasks);
Router.get('/show/:id',protect,getTask);
Router.put('/edit/:id',protect,taskValidation,updateTask);
Router.put('/markedcomplet/:id',protect,markTaskCompleted);
Router.delete('/delete/:id',protect,deleteTask);
Router.get('/find',protect,filterUserTasks)
Router.get('/stat',protect,UserTasksStatistiques)



module.exports = Router