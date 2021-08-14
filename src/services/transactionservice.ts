import { Service } from "typedi";
import { ITransaction } from "../interfaces/ITransaction";
const db = require("../models");
var bcrypt = require("bcryptjs");
const TransactionModel = db.transaction;
@Service()
export default class TransactionService {
  save(transactionBody: ITransaction) {
    const transaction = new TransactionModel({
      Date: transactionBody.Date,
      User: transactionBody.User,
      Credit: transactionBody.Credit,
      Coins: transactionBody.Coins,
    });

    return transaction.save();
  }

  async count() {
    const count: Number = await TransactionModel.countDocuments({});
    return count;
  }

  async getAllTransactions() {
    const all =await TransactionModel.find({}).sort( '-createdAt' );
    return all;
  }

  
}
