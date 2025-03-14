const express = require('express');
const router = express.Router();
const MoodCheck = require('../models/MoodCheck');

// Route to log mood check
router.post('/', async (req, res) => {
  try {
    const { moodRating, upsetAreas, username } = req.body;
    const alertShown = moodRating < 5; // Set alertShown based on mood rating

    const moodCheck = new MoodCheck({
      username,
      moodRating,
      upsetAreas,
      alertShown, // Include alert status
    });
    
    await moodCheck.save();
    res.status(201).json({ message: 'Mood check data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving mood check data' });
  }
});

module.exports = router;
