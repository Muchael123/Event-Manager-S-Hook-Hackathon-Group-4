import TicketTrigger from './createTicketTrigger.js';
import connection from './db.js';
import { insertCategories } from './insertData.js';

export const createAllTables = () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY ,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      phone_no VARCHAR(100),
      profile_img VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  const createCategoriesTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  const createEventsTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      event_date DATE NOT NULL ,
      event_time TIME NOT NULL ,
      duration INT,
      location VARCHAR(255),
      image_url VARCHAR(255),
      category JSON,
      max_attendees INT,
      user_id VARCHAR(36),
      ticket_price DECIMAL(10, 2),
      is_featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;
  const createTicketsTableQuery = `
  CREATE TABLE IF NOT EXISTS tickets (
    ticket_no INT AUTO_INCREMENT UNIQUE,
    id VARCHAR(36) PRIMARY KEY ,  
    event_id INT NOT NULL,  
    user_id VARCHAR(36) NOT NULL,
    attendee_name VARCHAR(100) NOT NULL,
    attendee_email VARCHAR(100) NOT NULL Default 'N/A',
    used BOOLEAN DEFAULT FALSE,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_event (event_id),
    INDEX idx_user (user_id)
)
  `;

  const DropeventsTableQuery = `DROP TABLE IF EXISTS events`;
  const DropUsersTableQuery = `DROP TABLE IF EXISTS users`;
  const DropCategoriesTableQuery = `DROP TABLE IF EXISTS categories`;
  const DropTicketsTableQuery = `DROP TABLE IF EXISTS tickets`;

  const queries = [createUsersTableQuery, createCategoriesTableQuery, createEventsTableQuery, createTicketsTableQuery];

  queries.forEach((query) => {
    connection.query(query, (err) => {
      if (err) {
        console.error('Error executing query:', err);
      } else {
        console.log('Table created successfully');
      }
    });
  });
  insertCategories();
  // TicketTrigger();
};

export default createAllTables;
