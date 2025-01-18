import connection from "../../lib/db.js";

export default async function EditTicket(req, res) {
    const { id } = req.params;
    const { attendee_name, attendee_email, used } = req.body;
    const user_id = req.userId;
    let eventOwner = false;
    if (!id) {
        return res.status(400).json({ message: 'Invalid request. Please provide a ticket id' });
    }

    const query1 = `SELECT * FROM tickets WHERE id = ?`;

    try {
        let query2 = `UPDATE tickets SET `;
        const values = [];
        const [result] = await connection.promise().query(query1, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        if (used !== undefined ) {
            const query3 = `SELECT * FROM events WHERE id = ?`;
            const [event] = await connection.promise().query(query3, [result[0].event_id]);

            if (event[0].user_id !== user_id) {
                return res.status(403).json({ message: `Unauthorized edit 'used'. Please contact event owner` });
            }
            eventOwner = true;
            query2 += `used = ?, `;
            values.push(used);
        }
        if (result[0].user_id !== user_id && !eventOwner) {
            return res.status(403).json({ message: 'You are not authorized to edit this ticket' });
        }
        
     
        if (attendee_name) {
            query2 += `attendee_name = ?, `;
            values.push(attendee_name);
        }

        if (attendee_email) {
            query2 += `attendee_email = ?, `;
            values.push(attendee_email);
        }

        query2 = query2.slice(0, -2);
        query2 += ` WHERE id = ?`;
        values.push(id);

        await connection.promise().query(query2, values);

        res.status(200).json({ message: "Ticket updated successfully", ticket: { id, attendee_name, attendee_email, used } });

    } catch (err) {
        console.error('Error updating ticket:', err);
        return res.status(500).json({ message: 'Error updating ticket. Please try again' });
    }
}
