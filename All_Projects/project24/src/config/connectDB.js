import mongoose from "mongoose";

async function connectDB(URI) {
    try {
        await mongoose.connect(URI);
        console.log("DB IS CONNECTED !!");
    } catch (error) {
        console.log("DB IS NOT CONNECTED ",error);        
    }
    
}

export default connectDB;

