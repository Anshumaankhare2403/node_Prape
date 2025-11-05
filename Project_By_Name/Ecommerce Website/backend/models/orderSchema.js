
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true } // Price at purchase time
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    paymentMethod: { type: String, enum: ["COD", "Card", "UPI"], default: "COD" },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
