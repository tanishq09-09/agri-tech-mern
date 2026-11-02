import { Router } from 'express';
import Record from '../models/Record.js';
import Resource from '../models/Resource.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router=Router();router.use(protect);
router.post('/',asyncHandler(async(req,res)=>{const {resourceId,quantity=1}=req.body;if(!Number.isInteger(Number(quantity))||Number(quantity)<1||Number(quantity)>100)return res.status(400).json({message:'Quantity must be 1–100.'});let resource;if(String(resourceId).startsWith('demo-'))resource={_id:resourceId,name:'Demo catalogue item',price:0};else resource=await Resource.findOne({_id:resourceId,active:true});if(!resource)return res.status(404).json({message:'Resource not found'});const order=await Record.create({owner:req.user._id,type:'order',title:`Order: ${resource.name}`,details:`Quantity: ${quantity}`,status:'Received',data:{resourceId:String(resource._id),quantity:Number(quantity),unitPrice:resource.price,total:Number(quantity)*resource.price}});res.status(201).json(order)}));
router.get('/my',asyncHandler(async(req,res)=>res.json(await Record.find({owner:req.user._id,type:'order'}).sort({createdAt:-1}))));
export default router;
