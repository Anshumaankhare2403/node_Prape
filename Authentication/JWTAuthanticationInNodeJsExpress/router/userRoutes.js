import express from "express";
import { handelUserSignin, handelUserSignup } from "../controller/userController.js";

const routers = express();

routers.post("/signup", handelUserSignup);
routers.post("/signin", handelUserSignin);


export default routers;

