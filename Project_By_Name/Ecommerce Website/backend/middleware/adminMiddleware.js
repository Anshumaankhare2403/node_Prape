// middleware/adminMiddleware.js
export const adminOnly = (req, res, next) => {
    if (req.user?.role === "admin") {
        console.log(req.user)
        next();
    } else {
        res.status(403).json({ message: "Admin access only" });
    }
};
