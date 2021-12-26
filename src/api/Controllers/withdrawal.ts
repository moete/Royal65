import { Request, Response } from "express";
import Services from "../../services";

const withdrawlService: any = new Services.WithdrawalService();

const AddWithdrawal = async (req: Request, res: Response) => {
  try {
    const withdrawal = withdrawlService.save({
      User: req.body.User,
      amount: req.body.amount,
    });
    if (withdrawal.message) {
      return res.status(400).send(withdrawal);    
    }

    withdrawal
      .then((succ: any) => {
        res
          .status(200)
          .send({ message: "withdrawal successfully transmetted" });
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).send({ message: "Please Verify your information!" });
      });
  } catch (err: any) {
    console.log(err);
    res.status(500).send({ message: "An error has occurred!" });
  }
};
const getAllWithdrawals = async (req: Request, res: Response) => {
  res.status(200).send({ data: await withdrawlService.getAllWithdrawls() });
};
export default {
  AddWithdrawal,
  getAllWithdrawals,
};
