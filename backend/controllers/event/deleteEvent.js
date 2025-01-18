import connection from "../../lib/db.js";

export default async function DeleteEvent(req, res) {
    const user = req.userId;
    const { id } = req.params;
    let title = ''
    const query1 = `SELECT * FROM events WHERE id = ?`;
    try {
        const [result] = await connection.promise().query(query1, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (result[0].user !== user) {
            return res.status(403).json({ message: 'You are not authorized to delete this event' });
        }
        const query = `DELETE FROM events WHERE id = ?`;
        title = result[0].title
        try {
            const [result] = await connection.promise().query(query, [id]);
            res.status(200).json({ message: `Event '${title}' deleted successfully` });
        } catch (err) {
            console.error('Error deleting event:', err);
            return res.status(500).json({ message: 'Error deleting event. Please try again' });
        }
    } catch (err) {
        console.error('Error fetching event:', err);
        return res.status(500).json({ message: 'Error deleting event. Please try again' });
    }
}
