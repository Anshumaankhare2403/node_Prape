import user from "../model/userAuth.js";
import bcrypt from "bcrypt";

export const handelUserSignup = async (req, res) => {
    try {
        const { Name, Email, Password, Role } = req.body;
        // console.log(Name, Email, Password, Role);
        if (!Name || !Email || !Password) {
            res
                .status(400)
                .json({ Error: "Enter the Name , Email , and Password" });
        }

        const isEmail = await user.findOne({ Email })
        if (isEmail) {
            res
                .status(400)
                .json({ Error: "Email already exists" });

        }
        if (Password.length < 8) {
            return res.status(400).json({ Error: "Password must be at least 8 characters" });
        }
        const hashedPass = await bcrypt.hash(Password, 10);

        const userData = await user.create({
            Name,
            Email,
            Password: hashedPass,
            Role
        })

        res
            .status(201)
            .json({
                massage: "User is Created",
                user: {
                    id: userData._id,
                    Name: userData.Name,
                    Email: userData.Email,
                    Role: userData.Role
                },
            });



    } catch (error) {
        res
            .status(500)
            .json({ Error: "Internal Server Error", ErrorDetails: error.massage });
    }
};


export const handelUserSignin = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        // console.log(Name, Email, Password, Role);
        if (!Email || !Password) {
            res
                .status(400)
                .json({ Error: "Enter the Name , Email , and Password" });
        }


        const userData = await user.findOne({
            Email,
        })
        if (!userData || !(await bcrypt.compare(Password, userData.Password))) {
            return res.status(401).json({ Error: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: userData._id,
                Name: userData.Name,
                Email: userData.Email,
                Role: userData.Role,
            },
        });
    } catch (error) {
        res.status(500).json({ Error: "Internal Server Error", details: error.message });

    }
}