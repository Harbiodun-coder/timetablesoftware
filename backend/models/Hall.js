const mongoose = require('mongoose');

// Hall Schema
const hallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Hall', hallSchema);
