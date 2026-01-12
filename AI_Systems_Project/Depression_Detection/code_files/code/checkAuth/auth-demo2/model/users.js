let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let crypto = require("crypto");
const Patient = require("./patient");

let userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  age: {
    type: Number
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  patients:[{type:mongoose.Schema.Types.ObjectId,ref:"Patient"}],
  resetToken: String,
  resetTokenExpiry: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.tokenResetPass = () => {
  let resetToken = crypto.randomBytes(20).toString("hex");
  this.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log(this.resetToken);
  this.resetTokenExpiry = 1 * 24 * 60 * 60;
  return resetToken;
};

userSchema.methods.getToken = function () {
  let token = jwt.sign({ id: this._id }, "ashdajksdhjkashdjbabsv", {
    expiresIn: "5d",
  });
  return token;
};

let User = mongoose.model("User2", userSchema);
module.exports = User;
