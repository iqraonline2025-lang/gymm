 import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  password: { 
    type: String,
    // Not required for Google users, only for Email/Password users
    required: function() { return !this.googleId; } 
  },
  image: { 
    type: String // To store Google profile picture
  },
  googleId: { 
    type: String,
    unique: true,
    sparse: true // Allows multiple users to NOT have a googleId
  },
  role: { 
    type: String, 
    enum: ['member', 'admin'], 
    default: 'member' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);