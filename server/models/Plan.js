import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: '£'
  },
  interval: {
    type: String,
    default: 'month'
  },
  features: [{
    type: String
  }],
  isPopular: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Plan = mongoose.models.Plan || mongoose.model('Plan', PlanSchema);
export default Plan;