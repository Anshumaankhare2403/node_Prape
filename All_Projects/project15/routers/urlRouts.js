import express from "express";
import { handelUrlShortner, handelGetUrlShortner } from "../controllers/urlControler.js";
const router = express();
router.get("/urlget", handelGetUrlShortner)
router.post("/url", handelUrlShortner)

export default router;