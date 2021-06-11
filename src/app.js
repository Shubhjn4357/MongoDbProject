require("dotenv").config()
const express = require('express')
const hbs=require("hbs")
const path=require("path")
const bcrypt=require("bcryptjs")
require("./Db/connection")
const auth=require("./middleware/auth")
const cookieParser=require("cookie-parser")
const StudentRoute=require("./Router/StudentRoute")
const port=process.env.PORT || 8000;
const template=path.join(__dirname,"../site/views")
const partials=path.join(__dirname,"../site/partials")
const Users=require("./modals/Users")
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.set("view engine","hbs")
app.set("views", template);
hbs.registerPartials(partials)
//app.use(auth)

app.get("/",auth,(req,res)=>{
    res.status(200).render("index")
})

app.get("/create",(req,res)=>{
    res.status(200).render("create")
})
app.get("/login",(req,res)=>{
    res.status(200).render("login")
})
app.get("/logout",auth,async(req,res)=>{
  try{
    req.users.tokens=await req.users.tokens.filter((elem)=>{
      return elem.token!==req.token;
    })
    await req.users.save()
    res.clearCookie("jwt")
    res.status(200).render("login")
  }
  catch(error){
    console.log(`logout error ${error}`)
    res.status("404").send(error)
  }
})

/*const securehash=async (pass)=>{
  try{
  const SecurePass=await bcrypt.hash(pass,12)
  console.log(SecurePass)
  return SecurePass;
  }
  catch{
    return ""
  }
  
}
const hashCheck=async (pass,hashval)=>{
  const checkedPass=await bcrypt.compare(pass,hashval)
  console.log(checkedPass)
  return checkedPass;
}
*/
//create user
app.post("/create",async(req,res)=>{
  try{
    const result=await new Users({
      "name":req.body.name,
      "email":req.body.email,
      "Num":req.body.Num,
      "password":req.body.password
    })
    
    const token= await result.generateToken();
    res.cookie("jwt",token,{
      expires:new Date(Date.now()+86400000),
      httponly:true
    })
    const response=await result.save()
    res.status(201).render("login");
  }
  catch(error){
   console.log(`create post: ${error}`)
   res.status(400).render("create")
  }
})
//check login request
app.post("/login",async(req,res)=>{
  try{
    const email=req.body.email;
    const pass=req.body.password;
    const result=await Users.findOne({email})
    const isValid=await bcrypt.compare(pass,result.password)
    if(isValid){
      const token= await result.generateToken();
      res.cookie("jwt",token,{
      expires:new Date(Date.now()+86400000),
      httponly:true
    })
      
      res.status(200).render("index")
    }
    else{
      
      res.status(400).send("invalid User")
    }
    
  }
  catch(error){
    console.log(`login post: ${error}`)
    res.status(400).render("create")
  }
})
app.use(StudentRoute)
app.listen(port,()=>{
  console.log(`listening on Port:${port}`)
})