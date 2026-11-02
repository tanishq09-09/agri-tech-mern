import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Seeds', 'Tools', 'Fertilizers', 'Irrigation', 'Other'], default: 'Other' },
  description: { type: String, default: '' },
  price: { type: Number, min: 0, required: true },
  unit: { type: String, default: 'item' },
  stock: { type: Number, min: 0, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Resource', schema);
