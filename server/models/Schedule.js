import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  className: { 
    type: String, 
    required: true 
  },
  day: { 
    type: String, 
    required: true, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
  },
  time: { 
    type: String, 
    required: true // e.g., "07:00 AM"
  },
  trainer: { 
    type: String, 
    required: true // We can link this to Trainer Name or ID
  },
  category: { 
    type: String, 
    required: true, 
    enum: ['Morning', 'Evening'] 
  },
  duration: { 
    type: String, 
    default: '60 MIN' 
  }
}, { timestamps: true });

export default mongoose.model('Schedule', scheduleSchema);