const db = require('mongoose')
const {mongoUri} = require('./env') 

const connectDB = async ()=>{
    try{
        await db.connect(mongoUri)
        console.log('connecting to database succesfuly ')
    }catch(err){
        console.log(`connecting to database feild : ${err}`)
        process.exit(1);
    }
}

module.exports = connectDB ;