import mongoose = require('mongoose');

const coins = new mongoose.Schema ({
   
    valeur : {
       type : Number ,
       required : true 
   },

   image : {
    type :Object,
    required: true
      },
      {timestamps:true}
});
export default mongoose.model<mongoose.Document>('coins', coins);