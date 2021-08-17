import { Service } from "typedi";
import { ITransaction } from "../interfaces/IReference";
const db = require("../models");
var bcrypt = require("bcryptjs");
const ReferenceModel = db.reference;
@Service()
export default class TransactionService {
  save(transactionBody: ITransaction) {
    const reference = new ReferenceModel({
        ReferenceFrom: transactionBody.ReferenceFrom,
        ReferenceTo: transactionBody.ReferenceTo,
        Code: transactionBody.Code,
        Bonus: transactionBody.Bonus,
    });

    return reference.save();
  }

  async count() {
    const count: Number = await ReferenceModel.countDocuments({});
    return count;
  }

  async getAllTransactions() {
    const all =await ReferenceModel.find({}).sort( '-createdAt' );
    return all;
  }

  
}
