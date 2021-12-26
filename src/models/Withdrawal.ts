import mongoose = require("mongoose");

const Withdrawal = mongoose.model(
  "Withdrawal",
  new mongoose.Schema(
    {
      User: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      amount: {
        type: Number,
        required: true,
      },
      accepted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);
module.exports = Withdrawal;
