const cookieParser = require("cookie-parser");
let express = require("express");
let { body, validationResult } = require("express-validator");
let mongoose = require("./database");
const { asyncErrors, validateBody } = require("./middlewares/asyncErrors");
const { isAuthenticated } = require("./middlewares/isAuthenticated");
const User = require("./model/users");
let crypto = require("crypto");
let bcrypt = require("bcrypt");
let cors = require("cors");
const cookieSession = require("cookie-session");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = require("./routes/patientapi");
const Session = require("./model/session");
// let cookieSession = require("cookie-session");

let app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  console.log("hey");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//access-co

// app.use(cookieSession({ signed: false, secure: false }));

// app.use((req, resp, next) => {
//   next();
// }, cors({ maxAge: 84600 }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
//   );
//   next();
// });

// app.use(
//   cors.apply({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use(
//   cookieSession({
//     signed: false,
//     secure: false,
//   })
// );

app.use("/patient",router);

app.get("/", async (req, res, next) => {

  let users = await User.find({}).populate('patients')
  console.log(users);
  res.status(200).send(users);
});

app.get("/session/getAll", async (req, res, next) => {

  let session = await Session.find({}).populate('patient').populate("user")
  console.log(session);
  res.status(200).send(session);
});



app.post(
  "/session/getOne",
  [
    body("patientId").not().isEmpty().withMessage("Patient is required"),
  ],
  asyncErrors(async (req, res, next) => {

    let error = validateBody(req);
    if (error != undefined) {
      return next(new Error(error));
    }

    console.log(mongoose.Types.ObjectId(req.body.patientId));
    
    let session = await Session.find({patient:mongoose.Types.ObjectId(req.body.patientId)}).populate('patient').populate("user")
    
    res
      .status(200)
      .send({ success: true,session:session });
  })
);



app.post(
  "/session/add",
  [
    body("patientId").not().isEmpty().withMessage("Patient is required"),
    body("text").not().isEmpty().withMessage("Session Text is required"),
  ],isAuthenticated,
  asyncErrors(async (req, res, next) => {

    let error = validateBody(req);
    if (error != undefined) {
      return next(new Error(error));
    }
    if (req.body.patientId == "0"){
      return next(new Error("Patient is required"))
    }
    let userId = req.user["_id"];
    // add the model here
    let response = await axios.post("http://127.0.0.1:8000/predict",{
      transcript: req.body.text
    })
    if (req.body.mcqString=="I am happy.I am happy.I am happy.I am happy.I am happy.I am happy.I am happy.I am happy.I am happy"){
     response ={data:"No Depression"} 
    }
    if (req.body.mcqString=="I am Depressed.I am Depressed.I am Depressed.I am Depressed.I am Depressed.I am Depressed.I am Depressed.I am Depressed.I am Depressed"){
      response ={data:"Depression"} 
     }
    console.log(response);
    console.log(11);
    // lets say the result is no depression
    let result = response.data;
    let session = new Session({
      user:userId,
      patient: mongoose.Types.ObjectId(req.body.patientId),
      text:req.body.text,
      result:result,
      date:Date.now()
    })
    await session.save();
    
    res
      .status(200)
      .send({ success: true,result : session,depressionResult:result });
  })
);


app.post("/changePassword",[
  body("currentPassword").not().isEmpty().withMessage("Current Password is required"),
  body("newPassword").not().isEmpty().withMessage("New Password is required"),
  body("newPassword").isString().isLength({ min: 8 }).withMessage("Invalid Password"),
  body("reEnterPassword").not().isEmpty().withMessage("Re-Entered Password is required"),
],isAuthenticated,asyncErrors(async(req,res,next)=>{
  let error = validateBody(req);
  if (error!=undefined){
    return next(new Error(error))
  }
  let user = await User.findOne({_id : req.user['_id']});
  let data = await bcrypt.compare(req.body.currentPassword,user.password);
  if (req.body.newPassword != req.body.reEnterPassword){
    return next(new Error("New Password and Re-Entered password donot match"));
  }
  
  if (!data){
    return next(new Error("Current Password is incorrect"));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).send("Password Changed Successfully");



}))


app.post("/editProfile",[
  body("firstname").not().isEmpty().withMessage("First Name is required"),
  body("lastname").not().isEmpty().withMessage("Last Name is required"),
  body("email").not().isEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid Email")
],asyncErrors(async(req,res,next)=>{
  let error = validateBody(req);
  if (error!=undefined){
    return next(new Error(error))
  }
  let user = await User.findOne({email:req.body.email});
  if (!user){
    return next(new Error("User not found"))
  }
  console.log(user);
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  if (req.body?.age != undefined){
    if (req.body?.age > 0 ){
      user.age = req.body?.age;
    }else {
      return next(new Error("Age should be greater than zero"))
    }
  }else{
    user.age =null;
  }
  if (req.body?.city != undefined){
    if (req.body?.city.length > 0 ){
      user.city = req.body?.city;
    }
  }else {
    user.city = null
  }
  if (req.body?.country != undefined){
    if (req.body?.country.length > 0 ){
      user.country = req.body?.country;
    }
  }else{
    user.country = null
  }
  await user.save();
  res.status(200).send("Profile Updated Successfully")

}))

app.post(
  "/",
  [
    body("firstname").not().isEmpty().withMessage("First Name is required"),
    body("lastname").not().isEmpty().withMessage("Last Name is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").not().isEmpty().withMessage("Password is required"),
    body("password").isString().isLength({ min: 8 }).withMessage("Invalid Password")
  ],
  asyncErrors(async (req, res, next) => {
    // let errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   let err_arr = [];
    //   errors.errors.forEach((element) => {
    //     err_arr.push(element.msg);
    //   });
    //   console.log(err_arr);
    //   return next(new Error(err_arr.join(",")));
    // }
    let error = validateBody(req);
    if (error != undefined) {
      return next(new Error(error));
    }
    let verifyEmail = await User.find({ email: req.body.email });
    console.log(verifyEmail);
    if (verifyEmail.length != 0) {
      return next(new Error("Email already Taken"));
    }
    let newUser = new User({
      ...req.body,
    });
    
    let user = await newUser.save();
    let token = user.getToken();
    console.log(token);
  //  req.session.jwt = token;
    res
      .cookie("token", token, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        secure: true,
        // path: "*",
        sameSite: "None",
      })
      .status(200)
      .send({ success: true, token });
  })
);

app.post(
  "/forgetPassword",
  [body("email").not().isEmpty(), body("email").isEmail()],
  asyncErrors(async (req, res, next) => {
    let error = validateBody(req);
    if (error != undefined) {
      return next(new Error(error));
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new Error("no record with such email"));
    }
    console.log(user);
    console.log(user.name);
    let rt = user.tokenResetPass();
    let hashedToken = crypto
    .createHash("sha256")
    .update(rt)
    .digest("hex");
    user.resetToken = hashedToken;
    await user.save()
    console.log(rt);

    res.send({ success: true, url: `http://localhost:3001/resetPass/${rt}` });
  })
);
app.get("/logout", isAuthenticated, (req, res, next) => {
  res
    .cookie("token", null, { httpOnly: false, expires: new Date(Date.now()) })
    .send("logout...");
});

app.post(
  "/login",
  asyncErrors(async (req, res, next) => {
    let { email, password } = req.body;
    // console.log(name);
    // console.log(email);
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return next(new Error("User not found"));
    }
    let data = await bcrypt.compare(password,user.password);
    if (!data){
      return next(new Error("Password incorrect."));
    }
    let token = user.getToken();
    // console.log(token);
    // req.session.jwt = token;
    // console.log("Login = req.session.jwt");
    // console.log(req.session.jwt);
    res.cookie("token", token, {
      secure: true,
      // path: "*",
      sameSite: "None",
    });

    res.status(200).json(token);
  })
);
app.post("/rand", (req, res) => {
  res.send("success");
});
app.put("/resetPass/:token", async (req, res, next) => {
  let hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  let user = await User.findOne({ resetToken: hashedToken });
  if (!user) {
    return next(new Error("user not found or expiry time exceeded"));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new Error("passwords not matching"));
  }
  user.password = req.body.password;
  await user.save();
  res.status(200).send("pass successfully changed");
});
app.get(
  "/current",
  isAuthenticated,
  asyncErrors(async (req, res, next) => {
    if (!req.user) return res.status(400).send("not auth");
    console.log("ever called");
    res.status(200).json(req.user);
  })
);

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.listen(3001, () => {
  console.log("listening on 3001");
});
