import { Router } from 'express';
import Record from '../models/Record.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router=Router(); router.use(protect);
router.get('/',asyncHandler(async(req,res)=>{const mine=await Record.find({type:'pest',owner:req.user._id}).sort({createdAt:-1});const samples=[{_id:'sample-1',title:'Scout leaves weekly',details:'Check both sides of leaves for eggs, spots, or unusual damage. Confirm the pest before treatment.',status:'General tip',sample:true},{_id:'sample-2',title:'Monsoon fungal risk',details:'After wet weather, inspect crops for fungal symptoms and avoid unnecessary leaf wetness.',status:'Seasonal tip',sample:true}];res.json([...mine,...samples])}));
router.post('/',asyncHandler(async(req,res)=>res.status(201).json(await Record.create({owner:req.user._id,type:'pest',title:req.body.title,details:req.body.details,status:'Open'}))));
router.patch('/:id',asyncHandler(async(req,res)=>{const r=await Record.findOneAndUpdate({_id:req.params.id,owner:req.user._id,type:'pest'},{status:req.body.status},{new:true});if(!r)return res.status(404).json({message:'Alert not found'});res.json(r)}));
export default router;
