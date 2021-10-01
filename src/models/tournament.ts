import config from "../config";
import mongoose = require("mongoose");
const tournamentStauts = config.tournamentStauts;

const Tournament = mongoose.model(
  "Tournament",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "please enter a title for your message"],
      },
      price: {
        type: Number,
        required: [true, "please enter the winner prize for your message"],
      },
      status: {
        type: Number,
        default: tournamentStauts.open,
      },
      start_time: {
        type: Date,
      },
      end_time: {
        type: Date,
      },
      entry_fee: {
        type: Number,
        required: [
          true,
          "please enter the amount to start  for your tournament ",
        ],
      },
      game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
      },
      players: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      capacity: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
      },
    },
    { timestamps: true }
  )
);
module.exports = Tournament;
