import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' },
  name: { type: String, required: true, trim: true },
  variety: { type: String, default: '' },
  plantedOn: { type: Date },
  expectedHarvest: { type: Date },
  stage: { type: String, enum: ['Planned', 'Growing', 'Flowering', 'Ready to harvest', 'Harvested'], default: 'Growing' },
  notes: { type: String, default: '' }
}, { timestamps: true });
export default mongoose.model('Crop', schema);
