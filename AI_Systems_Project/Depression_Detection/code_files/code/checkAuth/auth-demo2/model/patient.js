let mongoose = require("mongoose");


let patientSchema = new mongoose.Schema({
  patient_fname: {
    type: String,
    required: [true, "Patient First Name is required"],
  },
  patient_lname: {
    type: String,
    required: [true, "Patient Last Name is required"],
  },
  contact: {
    email:{
        type: String,
        required: [true, "Email is required"],
    },
    number:{
        type:Number,
        required:[true,"Contact Number is required"]
    },
    from : {
        city:{
            type:String,
            required: [true, "City is Required"]
        },
        country:{
            type:String,
            required: [true, "Country is Required"]
        }
    }
  }
});



let Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
