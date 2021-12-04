import mongoose = require('mongoose')

const GameTransaction = mongoose.model(
    "GameTransaction",
    new mongoose.Schema({
        amount: {
            type: Number,
            required: true
          },
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
          },
        match: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match",
            required: true
            }
    }, { timestamps: true })
  );
  
  module.exports = GameTransaction;