import mongoose = require('mongoose');

const Transaction = mongoose.model(
    "Transaction",
    new mongoose.Schema({
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
          Type:{
            type : String,
            required : true
          }
        },{timestamps: true })
  );
  
  module.exports = Transaction;