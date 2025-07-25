import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    if (!JWT_SECRET) {
        console.error("❌ JWT_SECRET not defined in environment");
        return res.status(500).json({ message: "Server error" });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No or bad token format" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next(); // 🟢 All good, move to the next middleware or route
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
