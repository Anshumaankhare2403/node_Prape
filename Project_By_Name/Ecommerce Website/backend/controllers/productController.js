import Product from "../models/productSchema.js";

export const createProduct = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const { name, description, price, quantity, imageUrl } = req.body;

        if (!name || !description || !price || !quantity) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        let finalImageUrl = imageUrl;

        // If file is uploaded, you can upload to cloud storage or keep as Base64
        if (req.file) {
            finalImageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        }

        const product = await Product.create({
            name,
            description,
            price,
            quantity,
            imageUrl: finalImageUrl,
            createdBy: req.user._id
        });

        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
