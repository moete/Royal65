import { Service } from "typedi";
const db = require("../models");
const WithdrawalModel = db.withdrawal;
@Service()
export default class WithdrawalService {
  async save(withdrawalBody: any) {
    const withdrawal = new WithdrawalModel({
      //   user: withdrawalBody.user,
      User: withdrawalBody.User,
      amount: withdrawalBody.amount,
      accepted: withdrawalBody.accepted,
    });
    return withdrawal.save();
  }
  async getAllWithdrawls() {
    return await WithdrawalModel.find();
  }
}
