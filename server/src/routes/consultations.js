import { Router } from 'express';
import Record from '../models/Record.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router=Router();router.use(protect);
router.post('/',asyncHandler(async(req,res)=>{if(!req.body.topic||!req.body.details)return res.status(400).json({message:'Add a topic and describe your question.'});res.status(201).json(await Record.create({owner:req.user._id,type:'consultation',title:String(req.body.topic).slice(0,120),details:String(req.body.details).slice(0,2000),status:'Requested'}))}));
router.get('/my',asyncHandler(async(req,res)=>res.json(await Record.find({owner:req.user._id,type:'consultation'}).sort({createdAt:-1}))));
export default router;
