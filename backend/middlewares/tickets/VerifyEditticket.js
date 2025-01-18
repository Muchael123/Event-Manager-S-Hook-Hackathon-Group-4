import TicketSchema from "../../schema/Ticketschema.js";

export default async function ValidateEditTicketData(req, res, next) {
    const {errors} = TicketSchema.validate(req.body);
    if(errors){
        return res.status(400).json({message: errors.details.map(err => err.message).join(',')});
    }
    next();
}