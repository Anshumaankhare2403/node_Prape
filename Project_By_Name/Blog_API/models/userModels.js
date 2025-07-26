import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    UserName: { type: String, required: true },
    UserEmail: { type: String, unique: true, required: true },
    UserPassword: { type: String, required: true }
}, {
    timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' },
});

const User = mongoose.model("User", UserSchema);

export default User;
