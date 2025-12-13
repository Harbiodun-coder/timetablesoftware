const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lecturer: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  schedule: { type: String },
});

// Automatically combine day + time to schedule
courseSchema.pre("save", function (next) {
  this.schedule = `${this.day} ${this.time}`;
  next();
});

module.exports = mongoose.model("Course", courseSchema);
