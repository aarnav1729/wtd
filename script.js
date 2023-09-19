document.addEventListener("DOMContentLoaded", function () {
    const predictionInput = document.getElementById("prediction-input");
    const submitButton = document.getElementById("submit-prediction");
    const predictionList = document.getElementById("prediction-list");
    const submitIcon = document.getElementById('submit-prediction');
    submitIcon.addEventListener('click', () => {
        // Submit form
    });

    // Load predictions from local storage
    const predictions = JSON.parse(localStorage.getItem("predictions")) || [];

    // Display predictions on page load
    displayPredictions();

    submitButton.addEventListener("click", function () {
        const predictionText = predictionInput.value.trim();
        if (predictionText !== "") {
            const rating = Math.floor(Math.random() * 4) + 1;
            const prediction = { text: predictionText, rating: rating };
            predictions.push(prediction);
            localStorage.setItem("predictions", JSON.stringify(predictions));
            predictionInput.value = "";
            displayPredictions();
        }
    });

    function displayPredictions() {
        predictionList.innerHTML = "";
        predictions.forEach((prediction, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>Prediction ${index + 1}:</strong> ${prediction.text} (Rating: ${prediction.rating})`;
            predictionList.appendChild(listItem);
        });
    }
});