const mongoose = require("mongoose")
require("dotenv").config()

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL
function connectDB(){
    mongoose.connect(MONGO_DB_CONNECTION_URL)

    mongoose.connection.on('connected', ()=>{
        console.log("connection to database was successful")
    })

    mongoose.connection.on('error', ()=>{
        console.log("an error occurred while connecting to database")
    })
}

module.exports = {connectDB}