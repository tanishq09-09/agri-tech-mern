import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['pest', 'order', 'consultation', 'post'], required: true },
  title: { type: String, required: true },
  details: { type: String, default: '' },
  status: { type: String, default: 'Open' },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });
export default mongoose.model('Record', schema);
