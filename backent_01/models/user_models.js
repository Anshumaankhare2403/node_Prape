import mongoose from "mongoose";

const signin_schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
}, {
    timestamps: true, // adds createdAt and updatedAt
});

const signin = mongoose.model("users", signin_schema);

export default signin;
