import RegistrationSchema from "../schema/RegistrationSchema.js"

export default function ValidateReg(req,res,next){
      const {error} = RegistrationSchema.validate(req.body)
      if(error){
         console.log(error)
         return res.status(400).send(error.details[0].message)
      }
      next()
   }
