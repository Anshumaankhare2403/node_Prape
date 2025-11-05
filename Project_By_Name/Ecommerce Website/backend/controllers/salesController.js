// controllers/salesController.js
import Order from "../models/orderSchema.js";

export const getMonthlySales = async (req, res) => {
    const { year, month } = req.query;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const sales = await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lt: end }, status: { $ne: "cancelled" } } },
        { $group: { _id: null, totalSales: { $sum: "$totalAmount" }, totalOrders: { $sum: 1 } } }
    ]);

    res.json(sales[0] || { totalSales: 0, totalOrders: 0 });
};

export const getYearlySales = async (req, res) => {
    const { year } = req.query;
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);

    const sales = await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lt: end }, status: { $ne: "cancelled" } } },
        { $group: { _id: null, totalSales: { $sum: "$totalAmount" }, totalOrders: { $sum: 1 } } }
    ]);

    res.json(sales[0] || { totalSales: 0, totalOrders: 0 });
};

