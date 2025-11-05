import mysql from "mysql2/promise";

async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Asdfghjkl1234#",
            database: "users"
        });

        console.log("✅ Database Connected");
        return connection;
    } catch (error) {
        console.log(error);
    }

}

export default connectDB;
