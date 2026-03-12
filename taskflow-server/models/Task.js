const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    "Title":{
        type: String,
        required: true
    },

	"Description":{
        type: String,
        required: true
    },

	"Status":{
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },

	"Priority":{
        type: String,
        enum:['Low', 'Medium','High'],
        default: 'Low'
    },

	"Due_Date":{
        type: Date,
        default:new Date()
    },

	"User_reference":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{timestamps:true})

const TaskModel = mongoose.model("Task",TaskSchema);

module.exports = TaskModel ;


