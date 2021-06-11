const express=require("express")
const SendData=express.Router();
const Students=require("../../modals/Students")
SendData.post('/std',async(req,res)=>{
  try{
    const Createuser=new Students(req.body)
    const result=await Createuser.save();
    if(result){
    res.status(201).send(result)
    }
    else{
      res.status(500).send(result)
    }
  }
  catch(error){
    res.status(400).send(error)
  }
})
module.exports=SendData;