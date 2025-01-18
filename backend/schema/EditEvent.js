import Joi from "joi";

const EditEventSchema = Joi.object({
    id: Joi.number().integer().required(),
    title: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    event_date: Joi.date().optional(),
    event_time: Joi.string().trim().optional(),
    duration: Joi.number().integer().optional(),
    location: Joi.string().trim().optional(),
    image_url: Joi.string().trim().optional(),
    category: Joi.array().items(Joi.string().trim()).optional(),
    max_attendees: Joi.number().integer().optional(),
    ticket_price: Joi.number().optional(),
    is_featured: Joi.boolean().optional(),
    current_attendees: Joi.number().integer().optional(),
})

export default EditEventSchema;
