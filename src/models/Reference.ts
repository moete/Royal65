var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

const Reference = mongoose.model(
    "Reference",
    new mongoose.Schema({
      // the one who sent the code
        ReferenceFrom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
          // Table of people refered
          ReferenceTo: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ],
        Bonus:{
            type: mongoose.Schema.Types.Double,
            required: true
          } 
        },{timestamps: true })
  );
  
  module.exports = Reference;