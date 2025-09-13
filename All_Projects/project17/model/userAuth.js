import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    Name: { type: String, required: true, trim: true },
    Email: { type: String, required: true, unique: true, lowercase: true },
    Password: { type: String, required: true, minlength: 6 },
    Role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true })

const user = mongoose.model("user", userSchema);

export default user;