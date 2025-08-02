// models/SalesReport.js
import mongoose from "mongoose";

const salesReportSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    month: { type: Number }, // 1 - 12 (Optional for yearly)
    totalSales: { type: Number, default: 0 }, // Total amount in currency
    totalOrders: { type: Number, default: 0 },
    totalProductsSold: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("SalesReport", salesReportSchema);
