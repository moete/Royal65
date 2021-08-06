import {  Service } from "typedi";
import { IPromotion } from "../interfaces/IPromotion";
const db = require('../models') ;
const PromoModel = db.Promo ;

@Service()
export default class PromotionService {
    constructor(){}
        save(PromoBody:IPromotion) {
            const promo = new PromoModel(
                {
                    title : PromoBody.title,
                    description : PromoBody.description,
                    image : PromoBody.image
                }
            );
            return promo.save() ;
        }
        async getAllPromos() {
            return await PromoModel.find();
          }


}

