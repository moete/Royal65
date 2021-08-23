import mongoose = require('mongoose')
const Mails = mongoose.model(
    "Mails",
    new mongoose.Schema({
      subject: String,
      message:String,
      status:String,
      to:[
          {
            type: String,
            require:true
        }
      ]
    })
  );
  
  module.exports = Mails;
  