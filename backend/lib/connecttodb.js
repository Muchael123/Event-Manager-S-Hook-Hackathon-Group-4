import mysql from 'mysql2';

export const connection = mysql.createConnection(process.env.MYSQL_DB_URL);
//Username, email, password, Phone_no* profile-img*
const ConnectToDB = () => {
  

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the MySQL database');
    }
  });

  const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        phone_no VARCHAR(100),
        profile_img VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    connection.query(createUsersTable, (err, results, fields) => {
        if (err) {
            console.error('Error creating the users table:', err);
        } else {
            console.log('Users table created successfully');
        }
        });
};

export default ConnectToDB;
