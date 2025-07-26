import mongoose from "mongoose";
const postBloc = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    }
}, {
    timestamps: true
});

const postBlocAPi = mongoose.model("Bloc", postBloc);

export default postBlocAPi;



