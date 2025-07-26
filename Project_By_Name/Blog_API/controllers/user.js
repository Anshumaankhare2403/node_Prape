import User from "../models/userModels.js";
import bcrypt from 'bcrypt';
export const handelUserSignup = async (req, res) => {
    try {
        const { UserName, UserEmail, UserPassword } = req.body;
        if (!UserEmail || !UserPassword) {
            res.status(400).json({ massage: "Enter the email and password" });
        }
        const pass = await bcrypt.hash(UserPassword, 8)
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
            res.status(400).json({ massage: "Enter the email and password" });
        }
        const pass = await bcrypt.compare(UserPassword, hash, function (err, result) {
            // result == true
            if (result == true) {
                console.log("good");
            }
        });

        const userSignup = await User.findOne()

        res.status(200).json({ massage: `singin sucessfull   `, data: userSignup });
    } catch (error) {
        res.status(500).json({ massage: error });
    }
}




