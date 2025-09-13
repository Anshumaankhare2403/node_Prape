import mongoose from "mongoose";

async function dbConnection(url) {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB is connected ");

    } catch (error) {
        console.log("Erro:", error.message);
        process.exit(1);

    }

}

export default dbConnection;