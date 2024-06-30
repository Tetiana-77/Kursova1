const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Не використовуємо зберігання файлів
const mysql = require('mysql2/promise'); // Потрібний пакет для роботи з MySQL

// Створення пула підключень
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: '140218Valentuna',
  database: 'dishes_database',
  port: 3307
});


async function dishes_add(name, category, cull, ingredient) {
  // перевірка та заміна undefined на null для параметрів
  name = name !== undefined ? name : null;
  cull = cull !== undefined ? cull : null;
  category = category !== undefined ? category : null;
  ingredient = ingredient !== undefined ? ingredient : null;

  const connection = await pool.getConnection();
  try {
    // використання параметрів у запиті
    await connection.query(
      'INSERT INTO dishes (name, category, cull, ingredient) VALUES (?, ?, ?, ?)',
      [name, category, cull, ingredient]
    );

    console.log('Страва успішно додана');
    return { success: true };
  } catch (error) {
    console.error('Помилка при виконанні запиту:', error.message);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { dishes_add, pool };
