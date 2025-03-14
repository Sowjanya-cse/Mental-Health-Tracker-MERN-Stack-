const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // User's email
  username: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: false },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
