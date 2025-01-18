import TicketSchema from "../../schema/Ticketschema.js";

export default function VerifyTicketData(req, res, next) {
    const { error } = TicketSchema.validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }
    next();
}