import mongoose from 'mongoose'
const EmailVerification = mongoose.model(
    "EmailVerification",
    new mongoose.Schema({
      email: String,
      token:String
    })
  );
  
  module.exports = EmailVerification;
  