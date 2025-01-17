import Joi from "joi";

//email, password
const LoginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).required(),
});
export default LoginSchema;