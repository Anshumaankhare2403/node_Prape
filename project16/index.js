import { PrismaClient, Role } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
const PORT = process.env.PORT;
const prisma = new PrismaClient().$extends(withAccelerate())


app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await prisma.User.create({
            data: {
                name,
                email,
                password,
                role
            }
        })
        console.log(user);
        res.status(201).json({ message: "User created", user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

})
app.get("/signdata", async (req, res) => {
    try {

        const user = await prisma.User.findMany();
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

})






app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));