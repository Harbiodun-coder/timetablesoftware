const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware'); // Import the protect and authorize middleware
const Hall = require('../models/Hall');

const router = express.Router();

// Get all halls (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const halls = await Hall.find();
    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching halls' });
  }
});

// Add a new hall (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  const { name, capacity } = req.body;

  try {
    const newHall = new Hall({ name, capacity });
    await newHall.save();
    res.status(201).json(newHall);
  } catch (error) {
    res.status(400).json({ message: 'Error creating hall' });
  }
});

// Edit a hall (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  const { name, capacity } = req.body;

  try {
    const updatedHall = await Hall.findByIdAndUpdate(req.params.id, { name, capacity }, { new: true });
    if (!updatedHall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.status(200).json(updatedHall);
  } catch (error) {
    res.status(400).json({ message: 'Error updating hall' });
  }
});

// Delete a hall (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const hall = await Hall.findByIdAndDelete(req.params.id);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.status(200).json({ message: 'Hall deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hall' });
  }
});

module.exports = router;
