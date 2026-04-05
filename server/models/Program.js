import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true 
  },
  slug: { 
    type: String, 
    required: [true, 'Slug is required'], 
    unique: true,
    lowercase: true 
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  benefits: {
    type: [String],
    default: []
  },
  target: { 
    type: String, 
    required: [true, 'Target audience is required'] 
  },
  image: { 
    type: String, 
    required: [true, 'Image URL is required'] 
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

const Program = mongoose.model('Program', programSchema);

export default Program;