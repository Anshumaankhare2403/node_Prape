import User from "../models/userModels.js";
import bcrypt from 'bcrypt';
export const handelUserSignup = async (req, res) => {
    try {
        const { UserName, UserEmail, UserPassword } = req.body;
        if (!UserEmail || !UserPassword) {
            res.status(400).json({ massage: "Enter the email and password" });
        }
        const pass = await bcrypt.hash(UserPassword, 8)
        const Isemail = await User.findOne({ UserEmail: UserEmail });
        if (Isemail) {
            res.status(409).json({ massage: "Email is exists" });
        }
        const userSignup = await User.create({
            UserName,
            UserEmail,
            UserPassword: pass
        })

        res.status(200).json({ massage: `singup sucessfull   `, data: userSignup });
    } catch (error) {
        res.status(500).json({ massage: error });
    }
}

export const handelUserSignin = async (req, res) => {
    try {
        const { UserEmail, UserPassword } = req.body;

        if (!UserEmail || !UserPassword) {
            return res.status(400).json({ message: "Enter the email and password" });
        }

        const userData = await User.findOne({ UserEmail });

        if (!userData) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(UserPassword, users.UserPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // You can add JWT token logic here if needed
        res.status(200).json({ message: "Signin successful", data: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




