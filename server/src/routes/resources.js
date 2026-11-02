import { Router } from 'express';
import Resource from '../models/Resource.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router=Router();
router.get('/',asyncHandler(async(_req,res)=>{let items=await Resource.find({active:true}).sort({category:1,name:1});if(!items.length)items=[{_id:'demo-seed',name:'Seasonal vegetable seeds',category:'Seeds',description:'Sample catalogue item; configure inventory in MongoDB.',price:120,unit:'packet',stock:20,demo:true},{_id:'demo-tool',name:'Hand garden tool',category:'Tools',description:'Sample catalogue item.',price:250,unit:'item',stock:10,demo:true},{_id:'demo-compost',name:'Organic compost',category:'Fertilizers',description:'Sample catalogue item; use crop-appropriate products.',price:180,unit:'bag',stock:15,demo:true}];res.json(items)}));
router.post('/',protect,adminOnly,asyncHandler(async(req,res)=>res.status(201).json(await Resource.create(req.body))));
router.patch('/:id',protect,adminOnly,asyncHandler(async(req,res)=>{const item=await Resource.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!item)return res.status(404).json({message:'Resource not found'});res.json(item)}));
export default router;
