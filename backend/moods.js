//routes/moods.js
const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

// Route to save mood log
router.post('/log', async (req, res) => {
    try {
        const {
            username, hoursSlept, depressedMood, elevatedMood, irritability, anxiety,
            appetite, socialinteraction, psychoticSymptoms, talkTherapy,
             note
        } = req.body;

        // Create a new mood log entry
        const newMood = new Mood({
            username,
            hoursSlept,
            depressedMood,
            elevatedMood,
            irritability,
            anxiety,
            appetite,
            socialinteraction,
            psychoticSymptoms,
            talkTherapy,
            note
        });

        // Save the mood log to the database
        await newMood.save();
        res.status(201).json({ message: 'Mood log saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save mood log' });
    }
});

module.exports = router;
