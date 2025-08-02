// controllers/orderController.js
import Order from "../models/orderSchema.js";

export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount, shippingAddress, paymentMethod } = req.body;

        const order = await Order.create({
            user: req.user._id,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod,

        });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
};

export const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

