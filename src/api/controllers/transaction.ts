import {  Request, Response } from 'express';
import { Container } from 'typedi';
import  Services from "../../services/"

const transactionService:any=Container.get(Services.TransactionService)

const count= async (req:Request, res:Response) => {
    res.status(200).send({data:await transactionService.count()});
  };

  const getAllTransactions= async (req:Request, res:Response) => {
    res.status(200).send({data:await transactionService.getAllTransactions()});
  };

export default {
      count,
      getAllTransactions
}