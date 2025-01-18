import Joi from "joi";

const TicketSchema = Joi.object({
    attendee_name: Joi.string().min(3).max(50).optional(),
    attendee_email: Joi.string().email().optional(),
    used: Joi.boolean().optional(),
})
export default TicketSchema;