import express from "express";
import { handelUserSignin, handelUserSignup } from "../controllers/user.js";


const router = express();

router.post('/signup', handelUserSignup);
router.post('/signin', handelUserSignin);


export default router;


