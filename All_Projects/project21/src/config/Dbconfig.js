const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (error) {
        console.error("DB error:",error.massage);
        process.exit(1);
    }
}

module.exports = connectDB;