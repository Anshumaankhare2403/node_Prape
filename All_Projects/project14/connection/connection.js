import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const connectionDB = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Asdfghjkl1234#",
    database: "users",
    waitForConnections: true,
    connectionLimit: 10,
});
export default connectionDB;