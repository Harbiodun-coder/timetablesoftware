// models/Timetable.js
const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  schedule: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecturer',
    },
    hall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hall',
    },
    time: String,
  }]
});

module.exports = mongoose.model('Timetable', timetableSchema);
