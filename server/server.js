const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the provided PORT or 3000 as a fallback

app.use(express.json());

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// Define an endpoint for retrieving predictions
app.get('/predictions', (req, res) => {
  // Replace this with your logic to fetch predictions from a database or storage
  // For now, we'll return a dummy response
  const predictions = [
    { text: 'Sample Prediction 1', rating: 3 },
    { text: 'Sample Prediction 2', rating: 4 },
  ];
  res.json(predictions);
});

// Define an endpoint for adding a new prediction
app.post('/predictions', (req, res) => {
  const prediction = req.body;
  // Replace this with your logic to save the prediction to a database or storage
  // For now, we'll just log the received prediction
  console.log('Received prediction:', prediction);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});