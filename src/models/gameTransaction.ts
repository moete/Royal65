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
        game: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            required: true
            }
    }, { timestamps: true })
  );
  
  module.exports = GameTransaction;