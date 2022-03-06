import mongoose = require('mongoose')
const Forgotpassword = mongoose.model(
    "Forgotpassword",
    new mongoose.Schema({
      email: String,
      token:String
    })
  );
  
  module.exports = Forgotpassword;
  