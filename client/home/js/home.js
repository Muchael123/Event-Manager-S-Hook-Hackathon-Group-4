import { fetchCategories } from './lib/fetchCategories.js';
import fetchEvents from './lib/fetchEvents.js';
import { checkToken, GetTokenfromLocalStorage } from './lib/Token.js';

checkToken();
export async function populateCategories() {
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
const token = GetTokenfromLocalStorage();
async function fetchUserData() {
  try {
    const token = GetTokenfromLocalStorage();
    if (!token) {
      alert('No token found, please login again');
      window.location.href = '/auth';
      return;
    }

    const response = await fetch('https://event-manager-g4.vercel.app/api/v1/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    const result = await response.json();
    console.log(result);

    if (response.status === 401) {
      alert('Session expired, please login again');
      window.location.href = '/auth';
      return;
    }

    if (!response.ok) {
      console.log(result.message, response.status);
      alert(result.message);
      return;
    }

    if (response.status === 200) {
      const userCard = document.getElementById('user-card');
      if (!userCard) {
        console.error('User card element not found');
        return;
      }

      // User profile
      const userData = result.user
      const userImage = document.createElement('img');
      userImage.classList.add('user-image');
      userImage.src = userData.image_url || 'default-image-url'; // Default image URL
      userImage.alt = `${userData.name || 'User'} Image`;
      userCard.appendChild(userImage);

      // User greet name
      const greetName = document.createElement('h3');
      greetName.classList.add('greet-name');
      greetName.innerText = `Hello ${userData.name || 'Anonymous'}`;
      userCard.appendChild(greetName);
    }

  } catch (error) {
    alert('An error occurred while fetching user data');
    console.error('Error fetching user data:', error);
  }
}


function Logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

const logoutbtn = document.getElementById('logout');
logoutbtn.addEventListener('click', Logout);


// Call the function to populate categories

populateCategories();
populateEvents();
fetchUserData();