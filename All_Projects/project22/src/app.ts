import express from "express";

import connection from "./connection/MongoDBconnection.ts";
import Login from "./model/login.ts";
const app = express();
app.use(express.json());
connection();
app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });

})

app.post("/add", async (req, res) => {
  try {
    const { name, password } = req.body;

    const data = await Login.create({
      name,
      password,
    });

    console.log(data);

    res.status(201).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create user",
      error,
    });
  }
});

export default app;