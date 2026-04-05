import express from 'express';
import multer from 'multer';
import path from 'path';
import Trainer from '../models/Trainer.js';

const router = express.Router();

// --- 1. CONFIGURE STORAGE ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists in your backend root
  },
  filename: (req, file, cb) => {
    // Creates a unique filename: timestamp-originalName
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only allow images
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error("Error: Only images (jpeg, jpg, png, webp) are allowed!"));
  }
});

// --- 2. GET ALL TRAINERS ---
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- 3. ADMIN: ADD NEW TRAINER (WITH UPLOAD) ---
// Note: 'image' must match the name used in frontend FormData.append('image', ...)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, experience, specialty, bio } = req.body;
    
    // The relative path to the image to be stored in DB
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newTrainer = new Trainer({
      name,
      experience,
      specialty,
      bio,
      image: imagePath // Saving the file path instead of a URL
    });

    await newTrainer.save();
    res.status(201).json(newTrainer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 4. ADMIN: DELETE TRAINER ---
router.delete('/:id', async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: "Personnel removed from roster." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;