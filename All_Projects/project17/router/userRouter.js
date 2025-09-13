import express from 'express';
import { handelUserSignin, handelUserSignup } from "../controller/userAuthController.js";

const route = express();

route
    .post("/signup", handelUserSignup);
route
    .post("/signin", handelUserSignin)


export default route;