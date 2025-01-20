**Event Manager Hackathon Challenge 🚀(HAFLA EVENT MANAGEMENT SYSTEM)**

**Overview**

The Event Manager Hackathon Challenge is a full-stack project designed to create a modern, interactive Event Management System. It incorporates a clean user interface and robust backend functionality using HTML, CSS, JavaScript, Node.js, and MySQL. The aim is to test full-stack development skills, focusing on responsive design, user-friendly interfaces, and efficient database management.

**Features**

**Basic Features (Must-Have)**

**Frontend**

Responsive, clean, and modern UI.

Mobile-friendly design with intuitive navigation.

Animated transitions and interactions for better user experience.

**Backend**

Node.js server with Express.js.

RESTful API for managing events.

**Event Management**

Add events with title, description, and date.

Display all events in a grid or list format.

View detailed event information.

Update existing events.

Delete events with confirmation.

**Data Validation**

Client-side and server-side validation for forms.

Prevent past-date entries for events.

Proper error handling and user feedback.

**Database**

MySQL database implementation.

Optimized queries and structured tables.

**Technical Details**
Frontend

Technologies: HTML5, CSS3, Vanilla JavaScript.

Features: Modals, animations, and transitions.

Responsive Design: Ensures compatibility across devices (mobile, tablet, desktop).

Backend

Framework: Node.js with Express.js.

Architecture: RESTful API.

Validation: Server-side checks for event data and security.

Database

Database: MySQL.

Schema: Optimized tables for events, users, and categories.

Integration: SQL queries via the mysql2 Node.js library.


**Setup Steps**

Clone the Repository:

git clone https://github.com/okwareddevnest/Event-Manager-S-Hook-Hackathon.git
cd Event-Manager-S-Hook-Hackathon

Install Dependencies:

npm install

Set Up the Database:

mysql -u root -p < db.sql

Configure Environment Variables:

Create a .env file in the project root and add:

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=event_manager_db

**Start the Server:**

node serverName.js

Access the Application:

Open your browser and navigate to http://localhost:3000.

**Resources**

Node.js Documentation: https://nodejs.org

MySQL Documentation: https://dev.mysql.com/doc/

Express.js Guide: https://expressjs.com/

CSS Animations Guide: https://css-tricks.com/almanac/properties/a/animation/

FontAwesome Icons: https://fontawesome.com

Deployment Guides: Heroku, Railway, or DigitalOcean documentation.

