import { IRecla } from "../interfaces/IRecla";
import mongoose = require('mongoose');

const Recla = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please enter a full name'],
        index: true,
      },
      subject: {
        type: String ,
        required : [true,'please enter a subject for your message'],
      },
      message : {
          type : String ,
          required : [true ,'please enter a valid message for your request']
      }
    },
    { timestamps: true },
  );
  
  export default mongoose.model<IRecla& mongoose.Document>('Recla', Recla);