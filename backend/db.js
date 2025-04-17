// filepath: c:\Users\Raksha\OneDrive\Desktop\dbms\backend\db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rakshu@123',
  database: 'crime_records_management'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL Database');
});


module.exports = db;