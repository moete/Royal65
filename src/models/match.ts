import mongoose = require('mongoose')
import config from '../config';
const db = require("../models");
const matchStatus=config.matchStatus

const Match = mongoose.model(
    "Match",
    new mongoose.Schema({
        name: {
          type: String
        },
        free: {
            type: Boolean,
            default: false
          },
          draw3: {
            type: Boolean,
            default: true
          },
        amount: {
            type: Number,
            required: true
          },
        status:{
            type: Number,
            default: matchStatus.open
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
            ref: "User",
            required: true
            }
        ]
    }, { timestamps: true })
  );
  
  module.exports = Match;