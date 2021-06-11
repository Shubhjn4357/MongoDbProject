const jwt=require("jsonwebtoken")
const Users=require("../modals/Users")
const auth=async(req,res,next)=>{
  try{
  const token=req.cookies.jwt;
  const verified=await jwt.verify(token,process.env.KEY)
  const user=await Users.findOne({"_id":verified._id}) 
  req.token=token;
  req.users=user;
  next()
  }
  catch(error){
    res.status(404).send(error)
  }
}
module.exports=auth;