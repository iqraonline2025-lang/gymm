import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // 1. Add this import

import { 
  getPrograms, 
  getProgramBySlug, 
  createProgram 
} from '../controllers/programController.js';

const router = express.Router();

// 2. Add this "Auto-Create" check right here
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 3. Keep your storage exactly as it is
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Routes
router.get('/', getPrograms);
router.get('/:slug', getProgramBySlug);
router.post('/', upload.single('image'), createProgram);

export default router;