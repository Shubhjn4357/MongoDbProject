const express=require("express")
const UpdateData=express.Router();
const Students=require("../../modals/Students")
UpdateData.patch('/std/:id',async(req,res)=>{
  try{
    const student =await Students.findByIdAndUpdate({"_id":req.params.id},req.body,{new:true})
    if(!student){
      res.status(404).send()
    }
    res.status(200).send(student)
    
  }
  catch(error){
    req.status(400).send(error)
  }
  
})
module.exports=UpdateData;