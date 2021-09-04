import mongoose = require('mongoose')

const Score = mongoose.model(
    "Score",
    new mongoose.Schema({
        score: {
            type: Number,
            required: true
          },
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
          },
        game: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            required: true
            }
    }, { timestamps: true })
  );
  
  module.exports = Score;