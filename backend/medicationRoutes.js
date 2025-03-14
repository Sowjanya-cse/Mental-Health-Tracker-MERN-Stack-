const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');

// Add new medication
router.post('/', async (req, res) => {
    const { name, dosage, units, timeOfDay, visible, username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const newMedication = new Medication({
            username,
            name,
            dosage,
            units,
            timeOfDay,
            visible,
        });

        await newMedication.save();
        res.status(200).json({ message: 'Medication saved successfully!' });
    } catch (error) {
        console.error('Error saving medication:', error);
        res.status(500).json({ message: 'Error saving medication', error });
    }
});

// Route to get visible medications for a user
router.get('/visible/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const visibleMedications = await Medication.find({ username, visible: true });
        res.status(200).json(visibleMedications);
    } catch (error) {
        console.error('Error fetching visible medications:', error);
        res.status(500).json({ message: 'Error fetching visible medications', error });
    }
});

module.exports = router;
