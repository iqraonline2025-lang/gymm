import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: String, required: true }, // e.g., "5 Years"
  specialty: { type: String, required: true },  // e.g., "Strength & Conditioning"
  bio: { type: String, required: true },
  image: { type: String, required: true },      // URL or file path
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Trainer', trainerSchema);