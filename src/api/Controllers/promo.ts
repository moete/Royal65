import {  Request, Response } from 'express';
import { Container }  from 'typedi';
import Services from '../../services';


const PromotionService:any=Container.get(Services.PromotionService)

const addPromo = (req:Request,res:Response) => {
    const promo = PromotionService.save({
        title : req.body.title,
        description : req.body.description,
        image : req.files
    }) ; 
    promo.save((err:any) => {
        if (err) {
          res.status(500).send({ message:  "Something went wrong!" });
          return;
        }

        res.send({ message: "Promotion was created  successfully!" });
      });
}
const getAllPromos= async (req:Request, res:Response) => {

    res.status(200).send({data:await PromotionService.getAllPromos() });
  };


export default {
    addPromo,
    getAllPromos,
}