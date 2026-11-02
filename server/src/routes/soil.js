import { Router } from 'express';
const router=Router();
router.post('/analyze',(req,res)=>{
  const ph=Number(req.body.ph), nitrogen=Number(req.body.nitrogen), phosphorus=Number(req.body.phosphorus), potassium=Number(req.body.potassium);
  if(![ph,nitrogen,phosphorus,potassium].every(Number.isFinite)||ph<0||ph>14||[nitrogen,phosphorus,potassium].some(v=>v<0)) return res.status(400).json({message:'Enter valid pH (0–14) and non-negative nutrient values.'});
  const tips=[];
  if(ph<5.5)tips.push('Soil is acidic. Ask a local soil expert whether liming is suitable for your crop.');
  else if(ph>7.5)tips.push('Soil is alkaline. Check micronutrient availability with a soil test.');
  else tips.push('pH is within a commonly suitable range for many crops; crop needs vary.');
  for(const [name,val] of [['Nitrogen',nitrogen],['Phosphorus',phosphorus],['Potassium',potassium]]) tips.push(`${name}: ${val<20?'low indicator — confirm with a lab test':val<50?'moderate indicator':'higher indicator'} based on the simple demo thresholds.`);
  tips.push('Use local agricultural recommendations before applying fertilizer. This tool is educational and not a laboratory diagnosis.');
  res.json({summary:'Preliminary soil guidance',tips,inputs:{ph,nitrogen,phosphorus,potassium}});
});
export default router;
