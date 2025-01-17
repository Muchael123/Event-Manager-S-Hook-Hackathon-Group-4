import connection from "../lib/db.js";

export default async function GetEventById (req, res){
    const { id } = req.params;
    if (!id ) {
        return res.status(400).json({ message: 'Invalid request. Please provide an event id' });
    }
    if(isNaN(id) || Number(id) < 1)
    {
        return res.status(400).json({ message: 'Invalid request. Please provide a valid event id' });
    }
    const query = `SELECT * FROM events WHERE id = ?`;
    try {
        const [result] = await connection.js.promise().query(query, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ event: result[0] });
    } catch (err) {
        console.error('Error fetching event:', err);
        return res.status(500).json({ message: 'Error fetching event. Please try again' });
    }
}