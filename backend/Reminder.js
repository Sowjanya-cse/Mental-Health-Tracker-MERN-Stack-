const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    username: { type: String, required: true },  // Added username field
    description: { type: String, required: true },
    time: { type: String, required: true },
    startingDate: { type: Date, required: true },
    lastDate: { type: Date, required: true },
    days: { type: [String], required: true },

    
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
