import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  area: { type: Number, min: 0, default: 0 },
  areaUnit: { type: String, enum: ['acre', 'hectare'], default: 'acre' },
  soilType: { type: String, default: 'Unknown' },
  irrigation: { type: String, default: 'Unknown' }
}, { timestamps: true });
export default mongoose.model('Farm', schema);
