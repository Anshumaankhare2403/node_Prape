import express from "express";
import userHandel from "../controllers/user.js";
import signin from "../models/user_models.js";
const router = express();

router.get("/signin", userHandel.handleSignin)
router.post("/signup", userHandel.handleSignup)
router.post("/signupupdate", async (req, res) => {
    const { email, name } = req.body;
    try {
        const update = await signin.updateOne(
            { email: email },
            { $set: { name: name } }
        );
        console.log(update);
        res.status(200).json({ message: "User updated", update });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Update failed" });
    }


})

export default router;