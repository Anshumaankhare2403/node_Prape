// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    role: { type: String, enum: ["customer", "admin"], default: "customer" }, // Admin / Customer
}, { timestamps: true });

const users = mongoose.model("User", userSchema);

export default users;
