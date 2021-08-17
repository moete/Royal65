import {  Request, Response } from 'express';
import { Container } from 'typedi';
import  Services from "../../services/"

const referenceService:any= new Services.ReferenceService();


const referencesave = (req:Request, res:Response) => {
    const user = referenceService.save({
      ReferenceFrom: req.body.ReferenceFrom,
      ReferenceTo: req.body.ReferenceTo,
      Code: req.body.Code,
      Bonus: req.body.Bonus,
    });
}

const count= async (req:Request, res:Response) => {
    res.status(200).send({data:await referenceService.count()});
  };

  const getAllReferences= async (req:Request, res:Response) => {
    res.status(200).send({data:await referenceService.getAllTransactions()});
  };

export default {
      referencesave,
      count,
      getAllReferences
}