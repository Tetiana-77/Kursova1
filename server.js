const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const bodyParser = require("body-parser");

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.raw({ type: 'text/plain' }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./controllers/loginController');
const dishesRoutes = require('./controllers/dishesController'); // Підключення файлу з маршрутами для страв
const rootDirectory = 'C:/Users/atama/OneDrive/Робочий стіл/rrrrrr/vika-food';
app.use('/', authRoutes); 
app.use('/', dishesRoutes); // Додано маршрути для страв

app.use('/src', express.static(path.join(rootDirectory, 'src')));


// Отримання головної сторінки
app.get(['/index.html', '/'], (req, res) => {
    res.sendFile(path.join(rootDirectory, 'index.html'));
});

// Отримання сторінки калькулятора
app.get(['/calculator', '/calculator.html'], (req, res) => {
    res.sendFile(path.join(rootDirectory, 'calculator.html'));
});

// Додавання маршруту для сторінки пошуку (dishes.html)
app.get(['dishes', '/dishes.html'], (req, res) => {
    res.sendFile(path.join(rootDirectory, 'dishes.html'));
});

// Додавання маршруту для сторінки контактів (contacts.html)
app.get(['contacts', '/contacts.html'], (req, res) => {
    res.sendFile(path.join(rootDirectory, 'contacts.html'));
});

// Додавання маршруту для сторінки входу (login.html)
app.get(['login', '/login.html'], (req, res) => {
    res.sendFile(path.join(rootDirectory, 'login.html'));
});

// Додавання маршруту для сторінки пошуку (dishes.html)
app.get(['dishes_add', '/dishes_add.html'], (req, res) => {
    res.sendFile(path.join(rootDirectory, '/dishes_add.html'));
});

// Підключення контролера для розрахунку калорій
const calculateController = require('./controllers/calculateController');

// Обробка POST-запиту для розрахунку калорій
app.post('/calculate', calculateController.calculateCalories);

const loginController = require('./controllers/loginController');
// POST-запит для авторизації
app.post('/auth', async (req, res) => {
    try {
        // Отримання даних з тіла запиту (приклад)
        const { username, password } = req.body;

        // Перевірка валідності користувача за допомогою loginController
        const result = await loginController.authenticateUser(username, password);

        // Перевірка результату авторизації
        if (result.success) {
            // Якщо користувач успішно авторизований
            res.status(200).json({ message: 'Авторизація успішна', user: result.user });
        } else {
            // Якщо авторизація не вдалася
            res.status(401).json({ message: 'Невірне ім\'я користувача або пароль' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
});

// POST-запит для реєстрації
app.post('/auth', async (req, res) => {
    try {
        // Отримання даних з тіла запиту (приклад)
        const { username, email, password} = req.body;

        // Перевірка валідності користувача за допомогою loginController
        const result = await loginController.authenticateUser(username, email, password);

        // Перевірка результату авторизації
        if (result.success) {
            // Якщо користувач успішно авторизований
            res.status(200).json({ message: 'Реєстрація успішна', user: result.user });
        }
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
});
//Server.js
app.post('/dishes_add', async (req, res) => {
    try {
      const { name, category, cull, ingredient } = req.body;
  
      // Отримання підключення з пула
      const connection = await pool.getConnection();
  
      // Вставка даних у базу даних
      const [result] = await connection.execute(
        'INSERT INTO dishes (name, category, cull, ingredient) VALUES (?, ?, ?, ?)',
        [name, cull, category, ingredient]
      );
  
      connection.release(); // Звільнення підключення
  
      res.status(200).json({ message: 'Дані про страву успішно додано', result });
    } catch (error) {
      console.error('Помилка при додаванні даних про страву:', error);
      res.status(500).json({ message: 'Помилка при додаванні даних про страву' });
    }
  });
  
app.listen(port, () => {
    console.log(`Сервер запущено на порті ${port}`);
});
