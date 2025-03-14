const mongoose = require('mongoose');

const MoodCheckSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Assuming you want to keep this
  date: { type: Date, default: Date.now },
  moodRating: { type: Number, required: true },
  upsetAreas: [{ type: String }],
  alertShown: { type: Boolean, default: false } // New field to track alert status
});

module.exports = mongoose.model('MoodCheck', MoodCheckSchema);
