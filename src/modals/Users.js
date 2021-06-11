require("dotenv").config()
const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const UsersSchema=mongoose.Schema({
  name:{
    type:String,
    minlength:[2,"Minimum 2 digit required"],
    maxlength:[20,"Max limit reach"],
    default:"Anonymous"
  },
  email:{
    type:String,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error(`wrong ->${value}<- email address`)
      }
    },
    unique:true,
    required:true,
  },
  Num:{
    type:Number,
    minlength:[10,"Wrong Number"],
    maxlength:[10,"Wrong Number"],
    required:true,
    unique:true
  },
  password:{
    type:String,
    minlength:[4,"Minimum 4 digit required"],
    required:true,
  },
  tokens:[{
    token:{
      type:String,
      required:true,
    }
  }]})
//generate Token
UsersSchema.methods.generateToken=async function(){
  try{
  const token=await jwt.sign({_id:this._id.toString()},process.env.KEY)
  this.tokens=this.tokens.concat({token})
  await this.save()
  return token
  }
  catch(error){
    console.log(`token error ${error}`)
    return error
  }
}
//Middleware
UsersSchema.pre("save",async function(next){
  if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10);
  }
  next()
})

const Users=mongoose.model(process.env.COL,UsersSchema)
module.exports=Users;