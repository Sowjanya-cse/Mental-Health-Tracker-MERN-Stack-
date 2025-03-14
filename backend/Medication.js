const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    username: { type: String, required: true },  // Added username field
    name: { type: String, required: true },
    dosage: { type: Number, required: true },
    units: { type: String, required: true },
    timeOfDay: { type: String, required: true },
    visible: { type: Boolean, required: true },
    
});

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;
