
import User from "../model/userAuth.js";

import jwt from "jsonwebtoken";
import argon2 from "argon2";


export const handelUserSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter the email and password" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password (method is in user schema)
        const isPass = await argon2.verify(user.password, password);
        if (!isPass) {
            return res.status(400).json({ message: "Invalid  password" });
        }



        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            "sexsex", // use env secret in production
            { expiresIn: "1m" }
        );

        // Success response (never send password back!)
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




export const handelUserSignup = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        if (!email || !password) {
            res.status(400).json({ "massage": `Please enter the email and password` });
        }

        const isEmail = await User.findOne({ email })
        if (isEmail) {
            res.status(400).json({ massage: "Email is alrade existed" })
        }

        const isPass = await argon2.hash(password);
        if (!isPass) {
            return res.status(400).json({ message: "Invalid password" });
        }


        const userData = await User.create({
            name,
            email,
            password: isPass,
            phone,
            role
        });
        const token = jwt.sign(
            { id: userData._id, email: userData.email, role: userData.role },
            "sexsex",
            { expiresIn: '1m' }          // Token validity (1 day)
        );

        res.status(201).json({
            massage: "user is created sucessfuly", user: {
                userData
            },
            token
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}