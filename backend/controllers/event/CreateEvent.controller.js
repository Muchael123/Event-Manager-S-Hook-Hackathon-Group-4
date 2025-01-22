import connection from "../../lib/db.js";
import DeleteAsset from "../../lib/DeleteAsset.cloudinary.js";

export default async function CreateEvent (req, res) {
    console.log(req.body, "req.body", req.userId);
    const { title, description, event_date, event_time, duration, location, image_url, category, max_attendees, ticket_price, is_featured, current_attendees } = req.body;
    const user = req.userId;
    console.log(JSON.stringify(category), user)
     let query = `INSERT INTO events (title, description, event_date, event_time, duration, location, image_url, category, max_attendees, ticket_price, is_featured,  user_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    try{
        const [result] = await connection.promise().query(query, [title, description, event_date, event_time, duration, location, image_url, JSON.stringify(category), max_attendees, ticket_price, Boolean(is_featured), current_attendees, user]);
        console.log(result);
        return res.status(201).json({ message: 'Event created successfully', 
            event: req.body
         });
         setTimeout(() => {
            window.location.reload();
          }, 5000);
    }catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({ message: 'Event with the title already exists' });
        }
        DeleteAsset(req.body.image_public_id);
        console.error('Error creating event:', err);
        return res.status(500).json({ message: 'Error creating event. Please try again' });
        
    }
}