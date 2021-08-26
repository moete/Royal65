import { IRecla } from "../interfaces/IRecla";
import mongoose = require('mongoose');

const Recla = mongoose.model(
  "Recla",
  new mongoose.Schema(
    {
      user: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        }
    ],
      subject: {
        type: String ,
        required : [true,'please enter a subject for your message'],
      },
      message : {
          type : String ,
          required : [true ,'please enter a valid message for your request']
      }
    },

  {timestamps: true })
);

module.exports = Recla;

