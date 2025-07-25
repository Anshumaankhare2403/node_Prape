import express from "express";
import { handleUserSingup } from "../controllers/user_controllers.js";

const router = express();

router.post('/signup', handleUserSingup);


export default router;