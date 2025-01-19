import { Router } from "express";
import ValidateReg from "../middlewares/validateregistration.js";
import Register from "../controllers/auth/register.controller.js";
import ValidateLogin from "../middlewares/validatelogin.js";
import Login from "../controllers/auth/login.controller.js";
import verifyToken from "../middlewares/VerifyToken.js";
import connection from "../lib/db.js";
const router = Router()

router.post("/login",ValidateLogin,Login)

router.post("/register",ValidateReg,Register)

router.get("/user", verifyToken, async (req,res)=>{
    console.log(req.userId, "user...")
    const userid = req.userId;
    const query = `SELECT * FROM users WHERE id = ?`
   try{
    const [result] = await connection.promise().query(query, userid);
    console.log(result)
    if(result.length < 1){
        return res.status(404).send("user not found")
    }
    else{
        return res.status(200).json({user : {
            name: result[0].name,
            email: result[0].email,
            phone_no: result[0].phone_no,
            profile_img: result[0].profile_img,
            id: result[0].id,
        }})
    }
   } catch(err){
       console.log(err)
   }
})


export default router