const mysql = require('mysql2/promise');
const multer = require('multer');
const upload = multer();


const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: '140218Valentuna',
  database: 'users_db',
  port: 3307
});


async function createUser(username, email, password) {


  const connection = await pool.getConnection();
  try {
    if (connection) {
      await connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
      );

      console.log('Користувач успішно зареєстрований');
      return { success: true };
    }
  } catch (error) {
    console.error('Помилка при виконанні запиту:', error.message);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function getUser(username, password) {
  const connection = await pool.getConnection();
  try {
    if (connection) {
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password]
      );

      if (rows.length === 0) {
        console.log('Користувача не знайдено');
        return { success: false, message: 'Користувача не знайдено' };
      }

      console.log('Вхід підтверджено');
      return { success: true, user: rows[0] }; // Повертаємо дані користувача
    }
  } catch (e) {
    console.error('Помилка при вході: ', e.message);
    throw e;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {createUser, getUser,pool};