let express = require("express");
const Patient = require("../model/patient");
const { asyncErrors, validateBody } = require("../middlewares/asyncErrors");
let { body, validationResult } = require("express-validator");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const User = require("../model/users");





var router = express.Router();
router.post('/add', 
[
    body("patient_fname").not().isEmpty().withMessage("Patient First Name is required"),
    body("patient_lname").not().isEmpty().withMessage("Patient Last Name is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("number").not().isEmpty().withMessage("Contact Number is required"),
    body("number").isNumeric().withMessage("Contact Number should be an integer"),
    body("city").not().isEmpty().withMessage("City is required"),
    body("country").not().isEmpty().withMessage("Country is required"),
    
  ],
  isAuthenticated,
  asyncErrors(async (req,res,next)=>{
    let error = validateBody(req);
    if (error != undefined) {
      return next(new Error(error));
    }
    let verifyEmailUser = await User.find({ email: req.body.email });
    let verifyEmailPatient = await Patient.find({ 'contact.email': req.body.email });
    if (verifyEmailUser.length != 0 || verifyEmailPatient.length != 0) {
      return next(new Error("Email already exists"));
    }
    let verifyNumber = await Patient.find({ 'contact.number': req.body.number });
    if (verifyNumber.length != 0 ) {
      return next(new Error("Contact Number already exists"));
    }
    console.log(req.user);
    let newPatient = new Patient({
        patient_fname:req.body.patient_fname,
        patient_lname : req.body.patient_lname,
        contact : {
            email:req.body.email,
            number:req.body.number,
            from:{
                city:req.body.city,
                country:req.body.country
            }
        }

    })
    console.log(newPatient["_id"]);

    await newPatient.save();
    let currentUser = await User.findOne({_id:req.user["_id"]})
    currentUser.patients.push(newPatient["_id"]);
    console.log(currentUser)
    await currentUser.save();
    res.send("Patient Successfully Added");
}))


router.post('/edit',[
  body("patient_fname").not().isEmpty().withMessage("Patient First Name is required"),
  body("patient_lname").not().isEmpty().withMessage("Patient Last Name is required"),
  body("email").not().isEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("number").not().isEmpty().withMessage("Contact Number is required"),
  body("number").isNumeric().withMessage("Contact Number should be an integer"),
  body("city").not().isEmpty().withMessage("City is required"),
  body("country").not().isEmpty().withMessage("Country is required"),
  
],isAuthenticated,
asyncErrors(async(req,res,next)=>{
  let error = validateBody(req);
  if (error != undefined) {
    return next(new Error(error));
  }
  let updatedPatient = await Patient.findOne({_id:req.body.id});
  if (!updatedPatient){
    return next(new Error("Patient not found"))
  }
  updatedPatient.patient_fname = req.body.patient_fname;
  updatedPatient.patient_lname = req.body.patient_lname;
  updatedPatient.contact = {
    email:req.body.email,
    number:req.body.number,
    from : {
      city : req.body.city,
      country: req.body.country
    }
  }
  await updatedPatient.save();
  res.status(200).send("Patient Updated Successfully.")
}))

router.get("/all",async (req,res)=>{
    let Patients = await Patient.find();
    res.status(200).send(Patients);
})


router.get("/",isAuthenticated,async (req,res)=>{

    let userId = req.user['_id'];
    let userPatients = await User.findOne({_id:userId}).populate('patients');
    res.status(200).send(userPatients.patients)
})


module.exports = router;