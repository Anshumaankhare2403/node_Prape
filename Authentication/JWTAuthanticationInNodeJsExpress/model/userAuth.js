import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // removes whitespace
        },
        email: {
            type: String,
            required: true,
            unique: true, // no two users can have the same email
            lowercase: true, // converts email to lowercase
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // basic validation
        },
        password: {
            type: String,
            required: true,
            minlength: 8, // minimum password length
        },
        phone: {
            type: String,
            match: [/^\d{10}$/, "Invalid phone number"], // example: 10 digits only
        },
        role: {
            type: String,
            enum: ["user", "admin"], // restrict role values
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // automatically adds createdAt & updatedAt
    }
);

const User = mongoose.model("User", userSchema);

export default User;
