import signin from "../models/user_models.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config({ debug: true });

const JWT_SECRET = process.env.JWT_SECRET;
if (!process.env.JWT_SECRET) {
    console.warn("⚠️ Warning: JWT_SECRET is not set in .env. Using default fallback.");
}
const handleSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("❌ Email and Password are required");
        }

        const user = await signin.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).send("❌ Invalid Email ID");
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(401).send("❌ Invalid Password");
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 2000 });

        return res.status(200).json({
            message: "✅ Signin successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Signin Error:", err);
        return res.status(500).send("❌ Server Error");
    }
};



const handleSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send("Error : Email and name and paswword are required ");

        }
        // user existe or not 
        const existeUser = await signin.findOne({ email });
        if (existeUser) {
            return res.status(409).send("Error: User already exists.")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const new_User = await signin.create(
            {
                name,
                email,
                password: hashedPassword
            }
        )

        res.status(201).json({
            message: "✅ User created successfully",
            user: {
                _id: new_User._id,
                name: new_User.name,
                email: new_User.email
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send("Internal Server Error");

    }
};

export default { handleSignin, handleSignup };
