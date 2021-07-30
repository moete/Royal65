import mongoose from 'mongoose'

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: String,
        username: String,
        address: String,
        active: Boolean,
        email: String,
        password: String,
        roles: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
            }
        ]
    }, { timestamps: true })
  );
  
  module.exports = User;