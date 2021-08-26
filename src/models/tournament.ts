import config from '../config'; 
import mongoose = require('mongoose') ; 
const tournamentStauts = config.tournamentStauts;
const Tournament = mongoose.model(
    "Tournament" , new mongoose.Schema(
        {
                title : {
                     type : String ,
                    required : [true,'please enter a title for your message'],
                        },
                price : {
                    type : Number , 
                    required : [true,'please enter the winner prize for your message'], 
                },
                status : {
                    type : Number,
                    default : tournamentStauts.open 
                },
                start_time :  {
                        type : Date,
                        required : true 
                },
                end_time : {
                    type : Date , 
                    required : true 
                },
                entry_fee : {
                    type : Number , 
                    required : [true,'please enter the amount to start  for your tournament '], 
                },
                capacity : {
                    type : Number ,
                    required : true 
                },
                description : {
                    type : String 
                },

            },
            {timestamps : true }
    )
);
module.exports = Tournament ; 