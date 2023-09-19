document.addEventListener("DOMContentLoaded", function () {
    const predictionInput = document.getElementById("prediction-input");
    const submitButton = document.getElementById("submit-prediction");
    const predictionList = document.getElementById("prediction-list");

    // Function to display predictions
    function displayPredictions() {
        // Send a GET request to your backend to retrieve all predictions
        fetch("https://wtd-o80p5gfyl-aarnav1729.vercel.app/") // Modify this URL to match your server
            .then(response => response.json())
            .then(predictions => {
                predictionList.innerHTML = "";
                predictions.forEach((prediction, index) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<strong>Prediction ${index + 1}:</strong> ${prediction.text} (Rating: ${prediction.rating})`;
                    predictionList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("Error fetching predictions:", error);
            });
    }

    // Display predictions on page load
    displayPredictions();

    // Submit prediction
    submitButton.addEventListener("click", function () {
        const predictionText = predictionInput.value.trim();
        if (predictionText !== "") {
            const rating = Math.floor(Math.random() * 4) + 1;
            const prediction = { text: predictionText, rating: rating };

            // Send a POST request to your backend to create a new prediction
            fetch("https://wtd-o80p5gfyl-aarnav1729.vercel.app/", { // Modify this URL to match your server
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(prediction),
            })
                .then(response => response.json())
                .then(data => {
                    predictionInput.value = "";
                    displayPredictions();
                })
                .catch(error => {
                    console.error("Error creating prediction:", error);
                });
        }
    });
});
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