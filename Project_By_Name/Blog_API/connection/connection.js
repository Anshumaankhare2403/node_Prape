import mongoose from "mongoose";

async function connectionDB(url) {
    const DB = await mongoose.connect(url)
        .then(() => console.log("DataBases is connected"))
        .catch((err) => {
            if (err) return err;
            console.log("DataBase is not connected");
        })
    return DB;

}

export default connectionDB;


