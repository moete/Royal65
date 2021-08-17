import mongoose from 'mongoose'

const Reference = mongoose.model(
    "Reference",
    new mongoose.Schema({
        ReferenceFrom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
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