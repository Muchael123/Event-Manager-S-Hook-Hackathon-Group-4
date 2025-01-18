
import connection from "../../lib/db.js";

export default async function EditEvent(req, res, next) {
    const user = req.userId;
    const {id} = req.body;
    const updates = [];
    const values = [];
    const query1 = `SELECT * FROM events WHERE id = ?`;
    try {
        const [result] = await connection.promise().query(query1, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (result[0].user !== user) {
            return res.status(403).json({ message: 'You are not authorized to update this event' });
        }
        else {
            const fields = ['title', 'description', 'event_date', 'event_time', 'duration', 'location', 'image_url', 'category', 'max_attendees', 'ticket_price', 'is_featured', 'current_attendees'];
            for (const field of fields) {
                if (req.body[field] !== undefined) {
                    updates.push(`${field} = ?`);
                    values.push(field === 'category' ? JSON.stringify(req.body[field]) : req.body[field]);
                }
            }
            if (updates.length === 0) {
                return res.status(400).json({ message: 'No fields to update' });
            }
            values.push(id);
            const query = `UPDATE events SET ${updates.join(', ')} WHERE id = ?`;
            try {
                const [result] = await connection.promise().query(query, values);
                console.log(result)
                res.status(200).json({ message: 'Event updated successfully', event: req.body });
            } catch (err) {
                console.error('Error updating event:', err);
                return res.status(500).json({ message: 'Error updating event. Please try again' });
            }
        }
    } catch (err) {
        console.error('Error fetching event:', err);
        return res.status(500).json({ message: 'Error updating event. Please try again' });
    }

}