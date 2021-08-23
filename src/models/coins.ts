import mongoose = require('mongoose');

const coins = new mongoose.Schema (

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
                      type : Object ,
                      required : true
                  } ,
                  

            },
            { timestamps: true },
 
    );
export default mongoose.model<mongoose.Document>('coins', coins);