import mongoose from 'mongoose'
const Mails = mongoose.model(
    "Mails",
    new mongoose.Schema({
      email_subject: String,
      email_content:String,
      folder:Number,
      read:Boolean,
      to:[
          {
            type: String,
            require:true
        }
      ]
    }, { timestamps: true })
  );
  
  module.exports = Mails;
  