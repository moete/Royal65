import {  Request, Response } from 'express';
import Services from '../../services';


const ReclaService:any= new Services.ReclaService() ;


const addRecla = async (req:Request , res : Response) => {
  try {
    const recla = ReclaService.save({
      user : req.body.user,
      message : req.body.message,
      subject : req.body.subject
  });
  if (recla.message) {
    return res.status(400).send(recla);
  }

  recla
    .then((succ: any) => {
      res.status(200).send({ message: "Reclamation successfully transmetted" });
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({ message: "Please Verify your information!" });
    });
  }  

   catch (err: any) {
    console.log(err);
    res.status(500).send({ message: "An error has occurred!" });
  }
}
const getAllReclas= async (req:Request, res:Response) => {

  res.status(200).send({data:await ReclaService.getAllReclas()});
};


export default {
  addRecla,
  getAllReclas
}

