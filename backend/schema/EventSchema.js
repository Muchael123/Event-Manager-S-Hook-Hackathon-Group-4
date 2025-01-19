import Joi from "joi";

const EventSchema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    event_date: Joi.date().required(),
    event_time: Joi.string().trim().required(),
    duration: Joi.number().integer().required(),
    location: Joi.string().trim().required(),
    category: Joi.array().items(Joi.string().trim()).required(),
    max_attendees: Joi.number().integer().required(),
    ticket_price: Joi.number().required(),
    is_featured: Joi.boolean().optional(),
    current_attendees: Joi.number().integer().optional(),
})


export default EventSchema;