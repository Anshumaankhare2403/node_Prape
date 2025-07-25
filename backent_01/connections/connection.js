import mongoose from "mongoose";

async function connection(url) {

    mongoose.connect(url)
        .then(() => console.log("MongoDB is Connected"))
        .catch(e => console.log("Error MongoDB is not Connected", e));

}

export default connection;