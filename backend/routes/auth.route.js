import { Router } from "express";
import ValidateReg from "../middlewares/validateregistration.js";
import Register from "../controllers/register.controller.js";
import ValidateLogin from "../middlewares/validatelogin.js";
import Login from "../controllers/login.controller.js";
const router = Router()

router.post("/login",ValidateLogin,Login)

router.post("/register",ValidateReg,Register)


export default router