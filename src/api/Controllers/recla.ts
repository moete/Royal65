import {  Request, Response } from 'express';
import { Container } from 'typedi';
import Services from '../services';


const ReclaService:any=Container.get(Services.ReclaService)


const addRecla =  (req:Request , res : Response) => {
    const recla = ReclaService.save({
        username : req.body.username,
        message : req.body.message,
        subject : req.body.subject
    });
    recla.save((err:any) => {
        if (err) {
          res.status(500).send({ message:  "Something went wrong!" });
          return;
        }

        res.send({ message: "Reclamation was Transfered  successfully!" });
      });
}
