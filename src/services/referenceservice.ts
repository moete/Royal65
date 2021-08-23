import { Service } from "typedi";
import { IReference } from "../interfaces/IReference";
const db = require("../models");
var bcrypt = require("bcryptjs");
const ReferenceModel = db.reference;
@Service()
export default class ReferenceService {
  save(referenceBody: IReference) {
    const reference = new ReferenceModel({
        ReferenceFrom: referenceBody.ReferenceFrom,
        ReferenceTo: referenceBody.ReferenceTo,
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
