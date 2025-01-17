import { Router } from "express";
import ValidateReg from "../middlewares/validateregistration.js";
import Register from "../controllers/register.controller.js";
const router = Router()

router.post("/login", (req,res)=>{
    res.status(200).send("auth coming soon...")
})

router.post("/register",ValidateReg,Register)


export default router