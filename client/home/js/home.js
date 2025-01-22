import { fetchCategories } from './lib/fetchCategories.js';
import fetchEvents from './lib/fetchEvents.js';
import { checkToken, GetTokenfromLocalStorage } from './lib/Token.js';

checkToken();

export async function populateCategories() {
  try {
    let categories = await fetchCategories(); 
    if (categories.length === 0) {
      categories = ["No categories"];
    }
    const categoriesList = document.getElementById('categories');
    categories.forEach(category => {
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
    const events = await fetchEvents();
    if (!events) {
      document.getElementById('events-container').innerHTML = "An error occurred.";
      return;
    }

    if (events.length === 0) {
      const eventsContainer = document.getElementById('events-container')
      const noEvents = document.createElement('p');
      noEvents.innerText = "No events available.";
      eventsContainer.appendChild(noEvents);
      return;
    }

    const eventsContainer = document.getElementById('events-container');

    events.forEach(event => {
      console.log(event);
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
      if (event.image_url) {
        console.log(event.image_url);
        const image = document.createElement('img');
        image.classList.add('event-image');
        image.src = event.image_url;
        image.alt = `${event.title} Image`;
        eventCard.appendChild(image);
      }

      const eventDetails = document.createElement('div');
      eventDetails.classList.add('event-details');
      eventCard.appendChild(eventDetails);

      const title = document.createElement('h3');
      title.classList.add('event-title');
      title.textContent = event.title;
      eventDetails.appendChild(title);

      const description = document.createElement('p');
      description.classList.add('event-description');
      description.textContent = event.description;
      eventDetails.appendChild(description);
      const calendarIcon = document.createElement('i');
      calendarIcon.className = 'fa-regular fa-calendar';
      
      const eventDate = document.createElement('p');
      eventDate.appendChild(calendarIcon);
      eventDate.appendChild(document.createTextNode (` Date: ${new Date(event.event_date).toLocaleDateString()}`));
      eventDetails.appendChild(eventDate);

      const location = document.createElement('p');
      const locationicon = document.createElement('i');
      locationicon.className = 'fa-solid fa-location-dot';
      location.appendChild(locationicon);

      location.appendChild(document.createTextNode(` Location: ${event.location}`));
      eventDetails.appendChild(location);

      const ticketPrice = document.createElement('p');
      const ticketicon = document.createElement('i');
      ticketicon.className = 'fa-solid fa-money-bill';
      ticketPrice.appendChild(ticketicon);
      ticketPrice.appendChild(document.createTextNode(` Ticket Price: ${event.ticket_price}`));
      eventDetails.appendChild(ticketPrice);
      const button = document.createElement('button');
      button.textContent = 'Attend Event';
      button.classList.add('attend-button');
      eventDetails.appendChild(button);
      eventsContainer.appendChild(eventCard);
      eventsContainer.appendChild(document.createElement('hr'));
    });
  } catch (error) {
    console.log('Error displaying events:', error);
  }
}

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

    if (response.status === 401) {
      alert('Session expired, please login again');
      window.location.href = '/auth';
      return;
    }

    if (!response.ok) {
      console.error(result.message, response.status);
      alert(result.message);
      return;
    }

    if (response.status === 200) {
      const userCard = document.getElementById('user-card');
      if (!userCard) {
        console.error('User card element not found');
        return;
      }

      const userData = result.user;
      const userImage = document.createElement('img');
      const smallUserImage = document.getElementsByClassName('small-user-image');
      userImage.classList.add('user-image');
      smallUserImage.src = userData.profile_img;
      userImage.src = userData.profile_img || 'default-image-url';
      userImage.alt = `${userData.name || 'User'} Image`;
      userCard.appendChild(userImage);

      const greetName = document.createElement('h3');
      const smgreet = document.getElementsByClassName('small-user-greet');
      greetName.classList.add('greet-name');
      greetName.innerText = `Hello ${userData.name}`;
      smgreet.innerText = `Hello ${userData.name}`;
      userCard.appendChild(greetName);
    }
  } catch (error) {
    alert('An error occurred while fetching user data');
    console.log('Error fetching user data:', error);
  }
}

function Logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

const logoutbtn = document.getElementById('logout');
const logoutbtn2  = document.getElementById('small-login')
logoutbtn.addEventListener('click', Logout);
logoutbtn2.addEventListener('click', Logout);

// Call the function to populate categories and events
populateCategories();
populateEvents();
fetchUserData();



const menu = document.getElementById('menu-icon');
const nav = document.getElementById('menu-content');
let toggleMenu = false;
function Toggle (){
  if(toggleMenu){
    nav.style.display = 'none';
    toggleMenu = false;
  }else{
    nav.style.display = 'block';
    toggleMenu = true;
  }
}
menu.addEventListener('click', Toggle);

