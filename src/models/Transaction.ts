var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema(
    {
      User: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      Credit: {
        type: mongoose.Schema.Types.Double,
        required: true,
      },
      Comission: {
        type: mongoose.Schema.Types.Double,
        required: true,
      },
      Type: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Transaction;
