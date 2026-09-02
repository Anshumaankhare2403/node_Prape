import mongoose from "mongoose";

export default async function dbconnection(){
    try {
        mongoose.connect("mongodb://localhost:27017/userdataforme");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}