import { Service } from "typedi";
import { IReference } from "../interfaces/IReference";
var shortid = require("shortid");

const db = require("../models");
var bcrypt = require("bcryptjs");
const ReferenceModel = db.reference;
@Service()
export default class TransactionService {
  save(referenceBody: IReference) {
    const reference = new ReferenceModel({
        ReferenceFrom: referenceBody.ReferenceFrom,
        ReferenceTo: referenceBody.ReferenceTo,
        Code: shortid.generate(),
        Bonus: referenceBody.Bonus,
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
