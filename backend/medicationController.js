// In routes/medications.js or similar
const express = require('express');
const router = express.Router();

router.post('/medications', async (req, res) => {
  const { username, name, dosage, units, timeOfDay, visible } = req.body;

  // Handle saving the medication
  const newMedication = new Medication({
    username,
    name,
    dosage,
    units,
    timeOfDay,
    visible
  });

  try {
    await newMedication.save();
    res.status(201).json({ message: 'Medication saved successfully' });
  } catch (error) {
    console.error('Error saving medication:', error);
    res.status(500).json({ message: 'Error saving medication' });
  }
});

module.exports = router;
