import express from "express";

import connectDB from "./connection/connection.js";
import router from "./routers/urlRouts.js";

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.use("/", router);




app.listen(PORT, () => console.log(`Serverstarted at http://localhost:${PORT}`));