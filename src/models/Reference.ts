import mongoose from 'mongoose'

const Reference = mongoose.model(
    "Reference",
    new mongoose.Schema({
      // the one who sent the code
        ReferenceFrom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
          // Table of people refered
          ReferenceTo: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ],
        Code: {
            type: String,
            required: true
          },
        Bonus:{
            type: Number,
            required: true
          } ,
        },{timestamps: true })
  );
  
  module.exports = Reference;