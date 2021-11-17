import mongoose = require('mongoose') ;

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: {
            type: String,
            required: true
          },
        username: {
            type: String,
            required: true
          },
        address: {
            type: String,
        //required: true
          },
          photo: {
              type: String,
              dafault:"uploads/userImages/default.jpg"
            },
        verified:{
              type: Boolean,
              default: false
          } ,
        active:{
            type: Boolean,
            default: false
          } ,
        email: {
            type: String,
            required: true
          },
        country: {
            type: String,
        //     required: true
          },
        password: {
            type: String,
            required: true
          },
          // Att added
          wallet: {
            type: Number,
            default : 0
          },
            // changed code attribute into user
           Code: {
            type: String,
     //       required: true
          },
        roles: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
            }
        ],
        //reference confirmation 
        referenceconfirmation : {
           type : Boolean,
           default : false
        }
    }, { timestamps: true })
  );
  
  module.exports = User;
