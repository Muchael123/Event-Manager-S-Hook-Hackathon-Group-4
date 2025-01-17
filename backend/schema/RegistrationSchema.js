import Joi from 'joi';
// email, name, password, phone_no, profile_img
 const RegistrationSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().trim().required(),
    phone_no: Joi.string().trim().optional(),
    profile_img: Joi.string().trim().optional(),
})
export default RegistrationSchema