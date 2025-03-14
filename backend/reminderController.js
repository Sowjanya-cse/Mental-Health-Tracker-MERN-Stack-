const Reminder = require('../models/Reminder');

// Create or update reminder
const saveReminder = async (req, res) => {
  try {
    const { description, time, startingDate, lastDate, days } = req.body;

    // Create new reminder entry
    const newReminder = new Reminder({
      description,
      time,
      startingDate,
      lastDate,
      days
    });

    await newReminder.save();
    res.status(201).json({ message: 'Reminder saved successfully!' });
  } catch (error) {
    console.error('Error saving reminder:', error);
    res.status(500).json({ message: 'Error saving reminder' });
  }
};

module.exports = { saveReminder };
