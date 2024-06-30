const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '140218Valentuna',
  database: 'users_db',
  port: 3307
});

module.exports = pool;
