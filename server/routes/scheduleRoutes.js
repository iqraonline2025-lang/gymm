import express from 'express';
import Schedule from '../models/Schedule.js';

const router = express.Router();

// 1. GET ALL CLASSES (For the public schedule)
router.get('/', async (req, res) => {
  try {
    const classes = await Schedule.find().sort({ time: 1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST NEW CLASS (From Admin)
router.post('/', async (req, res) => {
  try {
    const newClass = new Schedule(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE CLASS (From Admin)
router.delete('/:id', async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: "Class struck from schedule." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;