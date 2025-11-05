import mongoose from "mongoose";

const DBconnection = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,   // Only if needed, for older Mongoose versions
            // useFindAndModify: false // Deprecated in newer Mongoose versions
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Optional: Stop server if DB connection fails
    }
};

export default DBconnection;
