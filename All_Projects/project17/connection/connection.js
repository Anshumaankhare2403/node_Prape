import mongoose from "mongoose";

async function connectionDB(url) {

    await mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log(`Databases is Connected`))
        .catch((err) => console.log(`Databases is not Connected ${err}`))

}

export default connectionDB;