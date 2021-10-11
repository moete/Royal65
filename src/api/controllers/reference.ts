import { Request, Response } from "express";
import { Container } from "typedi";
import Services from "../../services/";


const referenceService: any = new Services.ReferenceService();
const userService : any = new Services.UserService();
var shortid = require("shortid");
const formulebonus = 2;
const referencesave = (req: Request, res: Response) => {
      
  try {
    const reference = referenceService.save({
      ReferenceFrom: req.body.ReferenceFrom,
      ReferenceTo: req.body.ReferenceTo,
      Bonus: req.body.Bonus,
    });
    if (reference.message) {
      return res.status(400).send(reference);
    }
    reference
      .then((succ: any) => {
        res.status(200).send({ message: "reference successfully created" });
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

const count = async (req: Request, res: Response) => {
  try{
  res.status(200).send({ data: await referenceService.count() });
}catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
};

const getAllReferences = async (req: Request, res: Response) => {
  try{
  res.status(200).send({ data: await referenceService.getAllTransactions() });
}catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
};

export default {
  referencesave,
  count,
  getAllReferences,
};
