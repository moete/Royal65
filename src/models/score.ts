import mongoose = require('mongoose')

const Score = mongoose.model(
    "Score",
    new mongoose.Schema({
        score1: {
            type: Number,
            required: true
          },
        score2: {
            type: Number,
            required: true
          },
        team2: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
            }
        ],
        team1: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
            }
        ],
        game: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            required: true
            }
    }, { timestamps: true })
  );
  
  module.exports = Score;