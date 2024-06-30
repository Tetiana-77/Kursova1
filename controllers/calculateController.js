// controllers/calculateController.js
function calculateCalories(req, res) {
    const { weight, height, years } = req.body;

    // Перевірка на від'ємні значення
    if (weight < 0 || height < 0 || years < 0) {
        return res.status(400).json({ error: "Будь ласка, введіть додатні числа у всі поля!" });
    }
    
    if (weight > 600  || height > 250 || years > 150) {
        return res.status(400).json({ error: "Будь ласка, введіть реальні числа у всі поля!" });
    }
    // Розрахунок калорій
    const results = (10 * weight) + (6.25 * height) - (5 * years) + 5;
    res.json({ calories: results });
}

module.exports = {calculateCalories};



