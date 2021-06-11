const express=require("express")
const RequestData=express.Router();
const Students=require("../../modals/Students")


RequestData.get('/std/:name',async(req,res)=>{
  try{
    const name=req.params.name;
    const student =await Students.findOne({"name":name})
    if(student){
      res.status(200).send(student)
    }
    else{
      res.status(500).send("not found")
    }
    
  }
  catch(error){
    req.status(400).send(error)
  }
})
RequestData.get('/std/',async(req,res)=>{
  try{
    const student =await Students.find({})
    if(student){
      res.status(200).send(student)
    }
    else{
      res.status(500).send("not found")
    }
    
  }
  catch(error){
    req.status(400).send(error)
  }
})
module.exports=RequestData;