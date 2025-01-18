import connection from "../../lib/db.js";

// const timeline = [
//     "This week",
//     "This month",
//     "today",
//     "tomorrow"
// ]

export default async function GetAllEvents(req, res) {
    const {page=1, limit=5 } = req.query;
    let categories = []
    let query = `SELECT * FROM events WHERE 1=1`;
    if(req.query.categories){
        categories = req.query.categories.split(',').map(cat => cat.trim());
        query += ` AND category IN (${categories.map(() => '?').join(',')})`;
    }


    query += ` LIMIT ? OFFSET ?`;
    const offset = (page < 2 ? 0 : (page - 1)) * limit;
    console.log(page, limit, offset, query);
    try {
        const [result] = await connection.promise().query(query, [...categories, Number(limit),Number(offset)]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No events found' });
        }
        res.status(200).json({ events: result });
    } catch (err) {
        console.error('Error fetching events:', err);
        return res.status(500).json({ message: 'Error fetching events. Please try again' });
    }
}