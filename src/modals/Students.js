const mongoose=require("mongoose")
const validator=require("validator")
const stdschema=mongoose.Schema({
  name:{
    type:String,
    unique:true,
    minlength:[2,"Minimum two value required"],
    minlengthgth:[16,"Maximum Limit Reach"],
    required:true
  },
 num:{
    type:Number,
    minlength:[10,"wrong Number"],
    unique:true,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error(`wrong ->${value}<- email address`)
      }
    }
  },
  description:{
    type:String,
    maxlength:[250,"Maximum Limit Reach"],
  }
})

const Students=mongoose.model('studentsdata',stdschema)
module.exports=Students;