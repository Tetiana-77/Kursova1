document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', calculateCalories);

    function calculateCalories() {
        const weight = document.querySelector('.weight').value;
        const height = document.querySelector('.height').value;
        const years = document.querySelector('.old').value;

        fetch('http://localhost:3000/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ weight, height, years })
        })
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.querySelector('.result');
            resultContainer.innerHTML = `<p>${data.calories} калорій.</p>`;
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
    }
});






