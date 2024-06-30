
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createUser, getUser, pool } = require('../login/user.js'); 
const mysql = require('mysql2/promise');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(session({
  secret: 'html1234', 
  resave: false,
  saveUninitialized: true,
}));

router.post('/users/create', upload.none(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, email, password } = req.body;
    console.log(req.body)
    await createUser(username, email, password);

    // Додавання користувача в сесію після створення
    req.session.user = { username, email }; // Приклад, можна зберігати більше інформації
    req.session.isLoggedIn = true;

    return res.status(200).send('Користувача успішно додано');
  } catch (error) {
    console.error('Помилка при додаванні користувача:', error);
    return res.status(500).send('Помилка при додаванні користувача');
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUser(username, password);

    // Установка сесії для авторизованого користувача
    if (user) {
      req.session.user = user;
      req.session.isLoggedIn = true;
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Помилка при вході:', error);
    return res.status(500).send('Помилка при вході');
  }
});

module.exports = router;
