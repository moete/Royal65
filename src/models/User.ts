import mongoose from 'mongoose'

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
            required: true
          },
        active:{
            type: Boolean,
            default: true
          } ,
        email: {
            type: String,
            required: true
          },
        country: {
            type: String,
            required: true
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
            required: true
          },
        roles: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
            }
        ]
    }, { timestamps: true })
  );
  
  module.exports = User;