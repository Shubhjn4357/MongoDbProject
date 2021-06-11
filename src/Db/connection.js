const mongoose=require("mongoose")
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBS}`,{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false,
}).then(()=>{
  console.log(`connection Sucessfull`)
}).catch((error)=>{
  console.log(error)
})