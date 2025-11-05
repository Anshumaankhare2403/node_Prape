// routes/productRoutes.js
import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import multer from "multer";

// ✅ Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get("/", getProducts);

// ✅ Use `upload.single("imageFile")` for FormData uploads
router.post("/", protect, adminOnly, upload.single("imageFile"), createProduct);

router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
