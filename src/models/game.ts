import mongoose from 'mongoose'
const db = require("../models");
const gameStatus=db.gameStatus

const Game = mongoose.model(
    "Game",
    new mongoose.Schema({
        free: {
            type: Boolean,
            default: true
          },
        amount: {
            type: Number,
            required: true
          },
        status:{
            type: Number,
            default: gameStatus.open
          } ,
        private: {
            type: Boolean,
            default: false
          },
        password: {
            type: String
          },
        capacity:{
            type: Number,
            default: 4
          } ,
        players: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ]
    }, { timestamps: true })
  );
  
  module.exports = Game;