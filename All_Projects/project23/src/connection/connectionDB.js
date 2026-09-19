import mongoose from "mongoose";

async function ConnectionDB(uri) {
    try {
        await mongoose.connect(uri);
        console.log("DB Connected !!!!!!!");
    } catch (error) {
        console.log("DB Not Connected ??????",massage.error);    
    }
}

export default ConnectionDB;