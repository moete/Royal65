import {  Request, Response } from 'express';
import { Container } from 'typedi';
import  Services from "../../services/"

const transactionService:any=Container.get(Services.TransactionService)


const transact = (req:Request, res:Response) => {
    const user = transactionService.save({
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
      address: req.body.address,
      country: req.body.country,
      password: req.body.password
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