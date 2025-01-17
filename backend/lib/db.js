import mysql from 'mysql2';

const connection = mysql.createConnection(process.env.MYSQL_DB_URL);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

export default connection;
