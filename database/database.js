const mongoose = require("mongoose");
  

const URI = "mongodb://localhost:27017/crud"

const connectDb = async () =>{
    try{
        await mongoose.connect(URI);
        console.log('MongoDB Connected...');
    }
    catch(error){
        console.error("database connection error");
    }
}

module.exports = connectDb;