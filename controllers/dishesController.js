const express = require('express');
const router = express.Router();
const multer = require('multer');
const { dishes_add, pool } = require('../dishes/dishes_add.js'); // Corrected file path

const upload = multer(); // Define the upload middleware

router.post('/dishes_add', upload.none(), async (req, res) => {
  try {
    const { name, category, cull, ingredient } = req.body;

    const result = await dishes_add(name, category, cull, ingredient);

    if (result.success) {
      res.status(200).json({ message: 'Дані про страву успішно додано', result });
    } else {
      res.status(500).json({ message: 'Помилка при додаванні даних про страву' });
    }
  } catch (error) {
    console.error('Помилка при додаванні даних про страву:', error);
    res.status(500).json({ message: 'Помилка при додаванні даних про страву' });
  }
});

module.exports = router;
