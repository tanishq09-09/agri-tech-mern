import dotenv from 'dotenv'; dotenv.config();
import mongoose from 'mongoose'; import bcrypt from 'bcryptjs'; import User from './models/User.js';
await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agritech');
const email=(process.env.ADMIN_EMAIL||'admin@example.com').toLowerCase();
const password=process.env.ADMIN_PASSWORD||'ChangeThisPassword123!';
const existing=await User.findOne({email});
if(existing){existing.role='admin';await existing.save();console.log(`Promoted ${email} to admin.`)}
else{await User.create({name:process.env.ADMIN_NAME||'Agri-Tech Admin',email,password:await bcrypt.hash(password,12),role:'admin'});console.log(`Admin created: ${email}`)}
await mongoose.disconnect();
