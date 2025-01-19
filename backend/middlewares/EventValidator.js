import EventSchema from '../schema/EventSchema.js'
export default function EventValidator(req, res, next) {
    const {error} = EventSchema.validate(req.body)
    if(error){
        console.log(error)
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }
    next()
}