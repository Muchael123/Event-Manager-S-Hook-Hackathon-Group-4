import connection from './db.js';

export const insertCategories = () => {
  const query = `
    INSERT IGNORE INTO categories (name)
    VALUES 
    ('Conferences'), ('Hackathons'), ('Webinars'), 
    ('Workshops'), ('Meetups'), ('Product Launches'), 
    ('Trade Shows and Expos'), ('Online'), ('In-Person'), ('Hybrid')
  `;
  connection.query(query, (err) => {
    if (err) {
      console.error('Error inserting data into categories table:', err);
    } else {
      console.log('Categories inserted successfully');
    }
  });
};
