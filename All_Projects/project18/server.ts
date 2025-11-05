import express, { Application } from "express";
import dotenv from "dotenv";
import connectDb from "./connection/dbConnection.ts";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ddd";

app.use(express.json());

// Start DB + Server
connectDb(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
