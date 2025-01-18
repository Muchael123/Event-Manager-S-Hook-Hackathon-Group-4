import EditEventSchema from '../schema/EditEvent.js'

export default function EditEventValidator(req, res, next) {
    const {error} = EditEventSchema.validate(req.body)
    if(error){
        console.log(error)
        return res.status(400).send(error.details[0].message)
    }
    next()
}