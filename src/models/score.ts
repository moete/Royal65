import mongoose = require('mongoose')

const Score = mongoose.model(
    "Score",
    new mongoose.Schema({
        score: {
            type: Number,
            required: true
          },
        time: {
            type: Number
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
  
  module.exports = Score;