import mongoose from "mongoose";

const userlogin =new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

},
  {
    timestamps: true,
  });

const user = mongoose.model("user",userlogin);
export default user;