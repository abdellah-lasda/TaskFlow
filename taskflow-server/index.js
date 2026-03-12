require("dotenv").config()

const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors') ;
const {port} = require('./config/env') 

const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();
app.use(cors())
app.use(express.json());


const startServer = async (port)=>{
    await connectDB()
    console.log(`server started : listening on ${port} `)
}



app.use('/api/auth',authRoutes)
app.use('/api/task',taskRoutes)
app.use('/api/user',userRoutes)



app.listen(port || 5000 ,()=>{
    startServer(port);
})