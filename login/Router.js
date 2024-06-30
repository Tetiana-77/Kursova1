const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
const { createUser, getUser, pool} = require('../login/user.js'); // Перейменовуємо pool на userPoo
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '140218Valentuna',
  database: 'users_db',
  port: 3307
});

// Маршрут для валідації даних при створенні нового користувача
router.post('/users/create', [
  // Перевірка правильності введення імені користувача
  body('username').isLength({ min: 3 }).withMessage('Ім\'я користувача повинно містити принаймні 3 символи'),

  // Перевірка правильності введення email
  body('email').isEmail().withMessage('Введіть коректний email')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Підключення до бази даних та додавання користувача
  connection.connect((err) => {
    if (err) {
      console.error('Помилка підключення до бази даних:', err);
      return res.status(500).send('Помилка підключення до бази даних');
    }

    const { username, email } = req.body;
    const userData = { username, email };

    connection.query('INSERT INTO users SET ?', userData, (error, results, fields) => {
      if (error) {
        console.error('Помилка при додаванні користувача:', error);
        return res.status(500).send('Помилка при додаванні користувача');
      }
      return res.status(200).send('Користувача успішно додано');
    });

    connection.end();
  });
});
// Додавання контролера для авторизації
const authController = require('./loginController'); // Підключення контролера авторизації

router.use('./loginController', authController); // Використання контролера для шляху /users/auth


module.exports = router;
