const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');  // Authentication routes
const moodRoutes = require('./routes/moods'); // Mood logging routes
const moodCheckRoutes = require('./routes/moodCheck');
const medicationRoutes = require('./routes/medicationRoutes');  // New medication routes
const reminderRoutes = require('./routes/reminderRoutes');  // New reminder routes


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parses incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/moods', moodRoutes);  // Mood logging routes
app.use('/api/moodcheck', moodCheckRoutes);  // Mood check routes
app.use('/api/medications', medicationRoutes);  // Medication routes
app.use('/api/reminders', reminderRoutes);  // Reminder routes


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log('MongoDB connection error:', err));

// Optional: Handle unhandled routes (404 errors)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Optional: Handle internal server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});
