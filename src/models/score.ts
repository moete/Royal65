import mongoose from 'mongoose'

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
            ref: "User"
            }
        ],
        team1: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ],
        game: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
    }, { timestamps: true })
  );
  
  module.exports = Score;