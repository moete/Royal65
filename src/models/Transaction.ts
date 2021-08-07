import mongoose from 'mongoose'

const Transaction = mongoose.model(
    "Transaction",
    new mongoose.Schema({
        Date: {
            type: Date,
            required: true
          },
          User: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ],
        Credit: {
            type: Number,
            required: true
          },
        Coins:{
            type: Number,
            required: true
          } ,
     timestamps: true })
  );
  
  module.exports = Transaction;