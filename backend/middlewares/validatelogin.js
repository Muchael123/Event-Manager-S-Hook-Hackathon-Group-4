import LoginSchema from "../schema/LoginSchema.js";

// validate login credentials
export default function ValidateLogin(req, res, next) {
    const { error } = LoginSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}