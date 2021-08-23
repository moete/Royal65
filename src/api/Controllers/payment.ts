import {  Request, Response } from 'express';
import { Container }  from 'typedi';
import Services from '../../services';

const PaymentService:any=Container.get(Services.PaymentService) 

const addCoin = ( req:Request , res : Response) => {
    const coin = PaymentService.save({
        coinValue : req.body.coinValue ,
        image : req.body.files
    })
    coin.save((err:any) => {
        if (err) {
          res.status(500).send({ message:  "Something went wrong!" });
          return;
        }

        res.send({ message: "Promotion was created  successfully!" });
      });
}

const GetAllCoins = async (req:Request , res : Response ) => {
    res.status(200).send({data:await PaymentService.getAllcoins() });
}
