import {  Request, Response } from 'express';
import { Container } from 'typedi';
import  Services from "../../services/"

const transactionService:any= new Services.TransactionService();


const transact = (req:Request, res:Response) => {
  try {
    const transaction = transactionService.save({
      Type: req.body.Type,
      User: req.body.User,
      Credit: req.body.Credit,
      Coins: req.body.Coins,
    });
    if (transaction.message) {
      return res.status(400).send(transaction);
    }

    transaction
      .then((succ: any) => {
        res.status(200).send({ message: "Transaction successfully created" });
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


const count= async (req:Request, res:Response) => {
  try{
        res.status(200).send({data:await transactionService.count()});
      }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
  };

  const getAllTransactions= async (req:Request, res:Response) => {
    try{
    res.status(200).send({data:await transactionService.getAllTransactions()});
  }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
  };

  const getAllTodayTransactions= async (req:Request, res:Response) => {
    try{
    res.status(200).send({data:await transactionService.getAllTodayTransactions()});
  }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
  };

  const getAllDeposit= async (req:Request, res:Response) => {
    try{
    res.status(200).send({data:await transactionService.getAllDeposit()});
  }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
  };
  const getallwithdrawal= async (req:Request, res:Response) => {
    try{
    res.status(200).send({data:await transactionService.getallwithdrawal()});
  }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
  };
  const getallBonus= async (req:Request, res:Response) => {
    try{
    res.status(200).send({data:await transactionService.getallBonus()});
  }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
  };



export default {
      transact,
      count,
      getAllTransactions,
      getAllTodayTransactions,
      getAllDeposit,
      getallwithdrawal,
      getallBonus
}