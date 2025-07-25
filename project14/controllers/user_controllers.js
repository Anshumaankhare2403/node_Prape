import { createPersons } from "../models/user_models.js";

export const handleUserSingup = async (req, res) => {
    const { Name, Email, Password } = req.body;
    try {
        const result = await createPersons(Name, Email, Password);
        res.status(201).json({ message: 'User created', id: result.insertId });

    } catch (error) {
        console.log(error);
    }

}