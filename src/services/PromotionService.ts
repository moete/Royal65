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
            return await PromoModel.find({status : true});
          }
        /*update the status from true to false */
          async updateStatus(data : any) {
            const all = await PromoModel.findOne({status : true}) ;
            if(all) {
                    data = new PromoModel ({
                            ...data,
                            status :false
                    })
            }
            return all.save()
        }
        async deletePromotion(id:any) {
            return await PromoModel.findByIdAndRemove(id) ;
        }

}

