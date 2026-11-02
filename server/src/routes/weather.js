import { Router } from 'express';
import axios from 'axios';
import { asyncHandler } from '../utils/asyncHandler.js';
const router=Router();
router.get('/',asyncHandler(async(req,res)=>{
  const city=String(req.query.city||'Delhi').trim();
  if(process.env.OPENWEATHER_API_KEY){
    try{
      const r=await axios.get('https://api.openweathermap.org/data/2.5/weather',{params:{q:city,appid:process.env.OPENWEATHER_API_KEY,units:'metric'},timeout:7000});
      return res.json({live:true,city:r.data.name,temp:r.data.main.temp,feelsLike:r.data.main.feels_like,humidity:r.data.main.humidity,description:r.data.weather?.[0]?.description||'Unavailable',wind:r.data.wind?.speed,icon:r.data.weather?.[0]?.icon});
    }catch(e){return res.status(502).json({message:'Live weather could not be loaded. Check the city or API key.'})}
  }
  res.json({live:false,city,temp:28,feelsLike:30,humidity:62,description:'Demo data — add an OpenWeatherMap API key for live weather',wind:3});
}));
export default router;
