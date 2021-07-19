import mongoose from 'mongoose'

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        fullName: String,
        address: String,
        username: String,
        email: String,
        password: String,
        roles: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
            }
        ]
    })
  );
  
  module.exports = User;