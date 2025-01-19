
document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventList = document.getElementById('eventList');
    const statusMessage = document.getElementById('statusMessage');

    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(eventForm);
        const userId = localStorage.getItem('token');

        if (!userId) {
            showStatus('User ID not found. Please log in.', 'error');
            return;
        }

        try {
            const response = await fetch('https://event-manager-g4.vercel.app/api/v1/events', {
                method: 'POST',
                headers: {
                    'User-ID': userId
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            const eventData = await response.json();
            addEventToList(eventData);
            eventForm.reset();
            showStatus('Event created successfully!', 'success');
        } catch (error) {
            console.error('Error:', error);
            showStatus('Failed to create event. Please try again.', 'error');
        }
    });

    function addEventToList(event) {
        const eventCard = document.createElement('div');
        eventCard.className = `event-card ${event.is_featured ? 'featured' : ''}`;
        
        eventCard.innerHTML = `
            <img src="${event.image_url || '/placeholder.svg?height=150&width=250'}" alt="${event.title}">
            <div class="event-card-content">
                <h3>${event.title}</h3>
                <p><strong>${formatDate(event.event_date)} at ${event.event_time}</strong></p>
                <p>${event.location}</p>
                <p>${event.current_attendees} attendees</p>
            </div>
        `;

        eventList.prepend(eventCard);
    }

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = type;
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = '';
        }, 5000);
    }

    function formatDate(dateString) {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
});
async function fetchCategories() {
    try {
      const response = await fetch('https://event-manager-g4.vercel.app/api/v1/categories', {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
  
      const categories = await response.json();
      console.log(categories);
      return categories.categories;
    } catch (error) {
      console.error('Error:', error);
    }
  }

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
  populateCategories();