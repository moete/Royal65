import {  Service } from "typedi";
import { Icons } from "../interfaces/ICoins";
const db = require('../models') ;
const Paymentmodel = db.coins ;

@Service()
export default class PaymentService {
    constructor() {}
    
    save(PaymentBody : Icons ) {
          const coins = new Paymentmodel (
              {
                coinValue : PaymentBody.coinValue ,
                image : PaymentBody.image
              }
          )
          return coins.save() ;
    } 
    async getAllcoins() {
        return await Paymentmodel.find() ;     
    } 
    

}