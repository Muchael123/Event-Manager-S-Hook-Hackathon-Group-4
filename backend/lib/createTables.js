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
      current_attendees INT DEFAULT 0,
      user VARCHAR(36),
      ticket_price DECIMAL(10, 2),
      is_featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user) REFERENCES users(id)
    )
  `;
  const DropeventsTableQuery = `DROP TABLE IF EXISTS events`;
  const DropUsersTableQuery = `DROP TABLE IF EXISTS users`;

  const queries = [createUsersTableQuery, createCategoriesTableQuery, createEventsTableQuery];

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
};

export default createAllTables;
