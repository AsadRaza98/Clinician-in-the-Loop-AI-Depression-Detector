let mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/fyp_depression")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err.message));

module.exports = mongoose;
