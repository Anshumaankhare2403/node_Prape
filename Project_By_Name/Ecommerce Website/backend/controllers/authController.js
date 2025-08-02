import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables first
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Predefined admin emails (you can put in .env instead)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(",");

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Enter the email and password" });
        }

        const exists = await User.findOne({ email: email.toLowerCase() });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // Assign role: if email is in ADMIN_EMAILS → admin, else customer
        const role = ADMIN_EMAILS.includes(email) ? "admin" : "customer";

        const user = await User.create({ name, email, password: hashedPassword, role });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Enter the email and password" });
        }
        console.log(password)
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(400).json({ success: false, message: "Invalid email" });

        const match = await bcrypt.compare(password, user.password);
        console.log(user.password)
        console.log(match)
        if (!match) return res.status(400).json({ success: false, message: "Invalid password" });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            massage: "Signin Done",
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};