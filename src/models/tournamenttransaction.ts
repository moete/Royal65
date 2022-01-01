import mongoose = require("mongoose");

const TournamentTransaction = mongoose.model(
  "TournamentTransaction",
  new mongoose.Schema(
    {
      tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true,
      },
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      score: { type: Number, requied: true },
    },
    { timestamps: true }
  )
);
module.exports = TournamentTransaction;
