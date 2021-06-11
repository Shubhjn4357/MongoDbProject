const express=require("express")
const DeleteData=express.Router();
const Students=require("../../modals/Students")
DeleteData.delete('/std/:id',async(req,res)=>{
  try{
    const student =await Students.findByIdAndDelete({"_id":req.params.id})
    if(!student){
      res.status(404).send()
    }
    res.status(200).send(student)
    
  }
  catch(error){
    req.status(400).send(error)
  }
})
module.exports=DeleteData;