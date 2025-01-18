import { randomUUID } from "crypto";
import connection from "../../lib/db.js";

async function AddTicket(req, res) {
 const { event_id, attendee_name, attendee_email='N/A'} = req.body;
  const user_id = req.userId;
  const id =  randomUUID();

  console.log(event_id, user_id, id);
  const query = ` INSERT INTO tickets (id, event_id, user_id, attendee_name, attendee_email) VALUES (?, ?, ?, ?, ?)`;
  try {
    const [result] = await connection.promise().query(query, [id, event_id, user_id, attendee_name, attendee_email]);
    console.log(result);
    return res.status(201).json({ message: "Ticket added successfully", ticket: {
      id,
      event_id,
      user_id,
      attendee_name,
      attendee_email
    } });
  } catch (err) {
    console.error("Error adding ticket:", err);
    return res.status(500).json({ message: "Error adding ticket. Please try again" });
  }

}
export default AddTicket;