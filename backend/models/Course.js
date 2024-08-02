// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecturer',
  },
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hall',
  }
});

module.exports = mongoose.model('Course', courseSchema);
