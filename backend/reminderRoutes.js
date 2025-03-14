// routes/remindersRoutes.js

const express = require('express');
const Reminder = require('../models/Reminder');
const router = express.Router();

// POST route to save a reminder
router.post('/', async (req, res) => {
    try {
        const { username, description, time, startingDate, lastDate, days } = req.body;

        // Ensure username is provided
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const reminder = new Reminder({
            username,
            description,
            time,
            startingDate,
            lastDate,
            days
        });

        await reminder.save();
        res.status(200).json({ message: 'Reminder saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving reminder' });
    }
});

// GET route to retrieve reminders for a specific user
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    
    try {
        const reminders = await Reminder.find({ username });
        
        if (!reminders.length) {
            return res.status(404).json({ message: 'No reminders found for this user' });
        }

        res.status(200).json(reminders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reminders' });
    }
});

module.exports = router;
