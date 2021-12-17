import mongoose = require('mongoose');

const coins= mongoose.model(
    "coins",
    new mongoose.Schema(
        {

            name : {
                type : String ,
                required : true
            },
            coinValue : {
                type : Number ,
                required : true
            },
            amount : {
                type : Number,
                required : true
            },
              image : {
                  type : String ,
                  required : true
              } ,
              

        },
  
    {timestamps: true })
  );
  
  module.exports =coins