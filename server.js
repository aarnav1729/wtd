// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect('mongodb://localhost:27017/wtd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Prediction = mongoose.model('Prediction', {
  text: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
});

// Middleware to parse JSON data
app.use(bodyParser.json());

// Create a new prediction
app.post('/api/predictions', async (req, res) => {
  try {
    const { text, rating } = req.body;
    const prediction = new Prediction({ text, rating });
    await prediction.save();
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Error creating prediction' });
  }
});

// Get all predictions
app.get('/api/predictions', async (req, res) => {
  try {
    const predictions = await Prediction.find().sort({ createdAt: -1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching predictions' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});