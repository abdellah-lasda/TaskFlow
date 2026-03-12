const mongoose = require('mongoose')

const UserSchema = new  mongoose.Schema({
    "Name":{type:String},
	"Email" :{type:String,unique:true,trim:true},
	"Password":{type:String}, 
	"CreatedAt":{type: Date,default: Date.now()}
})

const UserModel = mongoose.model("User",UserSchema)
module.exports = UserModel