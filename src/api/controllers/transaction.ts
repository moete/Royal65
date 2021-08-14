import {  Request, Response } from 'express';
import { Container } from 'typedi';
import  Services from "../../services/"

const transactionService:any= new Services.TransactionService();


const transact = (req:Request, res:Response) => {
    const user = transactionService.save({
      Date: req.body.Date,
      User: req.body.User,
      Credit: req.body.Credit,
      Coins: req.body.Coins,
    });
}

const count= async (req:Request, res:Response) => {
    res.status(200).send({data:await transactionService.count()});
  };

  const getAllTransactions= async (req:Request, res:Response) => {
    res.status(200).send({data:await transactionService.getAllTransactions()});
  };

export default {
      transact,
      count,
      getAllTransactions
}