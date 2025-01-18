import connection from "./db.js";

export default function TicketTrigger() {
    const query = `
    
    CREATE TRIGGER update_current_attendees_after_ticket_insert
    AFTER INSERT ON tickets
    FOR EACH ROW
    BEGIN
      UPDATE events
      SET current_attendees = current_attendees + 1
      WHERE id = NEW.event_id; 
    END;
    `;

    connection.query(query, (err) => {
        if (err) {
            console.error('Error creating trigger:', err);
        } else {
            console.log('Ticket Trigger created successfully');
        }
    });
}
