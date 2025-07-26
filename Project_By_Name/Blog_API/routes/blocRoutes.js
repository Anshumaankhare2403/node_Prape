import express from "express";
import { handelUserSignup } from "../controllers/user.js";


const router = express();

router.post('/signup', handelUserSignup);


export default router;


