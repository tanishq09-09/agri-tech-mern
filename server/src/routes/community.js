import { Router } from 'express';
import Record from '../models/Record.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router=Router();
router.get('/',asyncHandler(async(_req,res)=>res.json(await Record.find({type:'post'}).populate('owner','name').sort({createdAt:-1}).limit(100))));
router.post('/',protect,asyncHandler(async(req,res)=>{if(!req.body.title||!req.body.details)return res.status(400).json({message:'Add a title and message.'});res.status(201).json(await Record.create({owner:req.user._id,type:'post',title:String(req.body.title).slice(0,120),details:String(req.body.details).slice(0,2000),status:'Published'}))}));
export default router;
