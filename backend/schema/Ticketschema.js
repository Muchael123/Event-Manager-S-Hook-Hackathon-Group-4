import Joi from "joi";

const TicketSchema = Joi.object({
    event_id: Joi.number().integer().required(),
    attendee_name: Joi.string().min(3).max(50).required(),
    attendee_email: Joi.string().email().optional(),
})
export default TicketSchema;