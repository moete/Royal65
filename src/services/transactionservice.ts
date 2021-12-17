import { Service } from "typedi";
import { ITransaction } from "../interfaces/ITransaction";
var  endOfDay   =require( 'date-fns/endOfDay');
var   startOfDay    =require( 'date-fns/startOfDay');
var startOfYesterday  =require( 'date-fns/startOfYesterday');
var endOfYesterday =require( 'date-fns/endOfYesterday');

const db = require("../models");
var bcrypt = require("bcryptjs");
const TransactionModel = db.transaction;
@Service()
export default class TransactionService {
  save(transactionBody: ITransaction) {
    const transaction = new TransactionModel({
      Type: transactionBody.Type,
      User: transactionBody.User,
      Credit: transactionBody.Credit,
      Comission: transactionBody.Comission,
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

  async getAllDeposit() {
    //const all =await TransactionModel.find({}).sort( '-createdAt' );
    const all =await TransactionModel.aggregate(
    [
      { $match: {
        Type: "Deposit"
    }},
      {
        $group: {
          "_id": "$Type",
          "TotalAmount": { $sum: "$Credit"}
        }},
      
      ]
    );
    return all;
  }

  
  async getallwithdrawal() {
    //const all =await TransactionModel.find({}).sort( '-createdAt' );
    const all =await TransactionModel.aggregate(
    [
      { $match: {
        Type: "Withdrawal"
    }},
      {
        $group: {
          "_id": "$Type",
          "TotalAmount": { $sum: "$Credit"}
        }},
      
      ]
    );
    return all;
  }

  async getallBonus() {
    //const all =await TransactionModel.find({}).sort( '-createdAt' );
    const all =await TransactionModel.aggregate(
    [
      { $match: {
        Type: "Bonus"
    }},
      {
        $group: {
          "_id": "$Type",
          "TotalAmount": { $sum: "$Credit"}
        }},
      ]
    );
    return all;
  }




  async getAllTodayTransactions(){
     const  todaytransactions:number = await  TransactionModel.find({
      createdAt: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date())
      }
    }).countDocuments({})
     const  yesterdaytransactions:number = await  TransactionModel.find({
      createdAt: {
        $gte: startOfYesterday(),
        $lte: endOfYesterday()
      }
    }).countDocuments({})
    if (yesterdaytransactions == null )
    {
      return todaytransactions
    }
    else if (yesterdaytransactions == null && todaytransactions == null)
    {
      return 0
    }
    else 
    {
      return todaytransactions - yesterdaytransactions
    }
    
    
  }
  
}
