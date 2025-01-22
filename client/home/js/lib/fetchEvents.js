export default async function fetchEvents() {
    try {
      const response = await fetch('https://event-manager-g4.vercel.app/api/v1/events', {
        method: 'GET',
      });
  
      if (!response.ok) {
        return;
        throw new Error('Failed to fetch events');
      }
  
      const events = await response.json();
      console.log(events);
      return events.events;
    } catch (error) {
      console.log('Error:', error);
    }
    }