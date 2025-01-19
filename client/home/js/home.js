import { fetchCategories } from './lib/fetchCategories.js';
import fetchEvents from './lib/fetchEvents.js';
import { checkToken } from './lib/Token.js';

checkToken();
async function populateCategories() {
  try {
    let categories = await fetchCategories(); 
    console.log(categories);
    if (categories.length === 0) {
      categories = ["No categories"];
    }
    categories.forEach(category => {
      const categoriesList = document.getElementById('categories');
      const categoryElement = document.createElement('option');
      categoryElement.value = category;
      categoryElement.text = category;
      categoriesList.appendChild(categoryElement);
    });
  } catch (error) {
    console.error('Error populating categories:', error);
  }
}

async function populateEvents() {
    try {
        const events = await fetchEvents(); // Fetch events
    
        if (events.length === 0) {
          document.getElementById('events-container').innerHTML = "No events available.";
          return;
        }
    
        
        const eventsContainer = document.getElementById('events-container');
        eventsContainer.innerHTML = ""; // Clear the container if it has any previous content
    
        events.forEach(event => {
          // Create a container for each event
          const eventCard = document.createElement('div');
          eventCard.classList.add('event-card');

           // Event image
           if (event.image_url) {
            console.log(event.image_url);
            const image = document.createElement('img');
            image.classList.add('event-image');
            image.src = event.image_url;
            image.alt = `${event.title} Image`;
            eventCard.appendChild(image);
          }

          //eventdetails container
            const eventDetails = document.createElement('div');
            eventDetails.classList.add('event-details');
            eventCard.appendChild(eventDetails);
          // Event title

          const title = document.createElement('h3');
          title.classList.add('event-title');
          title.textContent = event.title;
          eventDetails.appendChild(title);
    
          // Event description
          const description = document.createElement('p');
          description.classList.add('event-description');
          description.textContent = event.description;
          eventDetails.appendChild(description);
          // Event date
          const eventDate = document.createElement('p');

          eventDate.textContent = `Date: ${new Date(event.event_date).toLocaleDateString()}`;
          eventDetails.appendChild(eventDate);
    
          // Event location
          const location = document.createElement('p');
          location.textContent = `Location: ${event.location}`;
          eventDetails.appendChild(location);
    
          // Event ticket price
          const ticketPrice = document.createElement('p');
          ticketPrice.textContent = `Ticket Price: KES ${event.ticket_price}`;
          eventDetails.appendChild(ticketPrice);
    
         
    
          // Append the event card to the events container
          const horizontalLine = document.createElement('hr');
          eventsContainer.appendChild(horizontalLine);
          eventsContainer.appendChild(eventCard);
          
          
    
        });
      } catch (error) {
        console.error('Error displaying events:', error);
      }
    }
    

// Call the function to populate categories
populateCategories();
populateEvents();
