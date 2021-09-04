import mongoose from "mongoose";
const Double = require("@mongoosejs/double");

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
        type: Double,
        required: true,
      },
      Comission: {
        type: Double,
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
