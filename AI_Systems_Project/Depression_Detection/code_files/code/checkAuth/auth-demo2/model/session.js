let mongoose = require("mongoose");


let sessionSchema = new mongoose.Schema({
  patient:{type:mongoose.Schema.Types.ObjectId,ref:"Patient",required:[true,"Patient Id is required"]},
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User2",required:[true,"User Id is required"]},
  text:{type:String , required:[true,"text is required"]},
  result:{type:String , required:[true, "Result is required"]},
  date:{type:Date , required:[true,"Date Required"]}
});



let Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
