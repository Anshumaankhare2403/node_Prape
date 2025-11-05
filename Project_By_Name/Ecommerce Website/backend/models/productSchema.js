import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, default: "Dry Fruits" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }, // Available Stock
    imageUrl: { type: String, required: true }, // Store Firebase / Drive URL
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Admin who added
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
