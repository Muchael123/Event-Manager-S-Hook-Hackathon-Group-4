import validator from 'validator';
export default function ValidateReg(req,res,next){
   
   const {email, name, password, phone_no, profile_img} = req.body
   const errors = []
   if(!email)
       errors.push("Email is required")
   if(!name)
         errors.push("Name is required")
   if(!password)
         errors.push("Password is required")
   if(email && !validator.isEmail)
    errors.push("Email is invalid")
   if(password && !validator.isStrongPassword(password))
      errors.push("Password is weak")
   if(phone_no && !validator.isMobilePhone(phone_no))
      errors.push("Phone number is invalid")
   if(profile_img && !validator.isURL(profile_img))
      errors.push("Profile image is invalid")
   if(errors.length > 0)
      return res.status(400).json({errors})
   else{
      console.log("validation successful")
      next()
   }


    next()
}

