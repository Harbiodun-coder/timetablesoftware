const express = require("express");
const Course = require("../models/Course"); // create models/Course.js
const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ data: courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// POST a new course
router.post("/", async (req, res) => {
  try {
    const { name, lecturer, day, time } = req.body;
    const course = new Course({ name, lecturer, day, time });
    await course.save();
    res.status(201).json({ data: course });
  } catch (err) {
    res.status(400).json({ error: "Failed to create course" });
  }
});

// PUT update course
router.put("/:id", async (req, res) => {
  try {
    const { name, lecturer, day, time } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, lecturer, day, time, schedule: `${day} ${time}` },
      { new: true }
    );
    res.json({ data: course });
  } catch (err) {
    res.status(400).json({ error: "Failed to update course" });
  }
});

// DELETE a course
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete course" });
  }
});

module.exports = router;
