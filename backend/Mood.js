//models/Mood.js
const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hoursSlept: {
        type: String,  // String type to capture the "1 to 12" range as string
        required: true
    },
    depressedMood: {
        type: String,  // String type to capture "none, mild, moderate, severe"
        required: true
    },
    elevatedMood: {
        type: String,
        required: true
    },
    irritability: {
        type: String,
        required: true
    },
    anxiety: {
        type: String,
        required: true
    },
    appetite: {
        type: String,
        required: true
    },
    socialinteraction: {
        type: String,
        required: true
    },
    psychoticSymptoms: {
        type: String,
        required: true
    },
    talkTherapy: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    logDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Mood', moodSchema);

