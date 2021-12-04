import { Service } from "typedi";
const db = require("../models");
const CoinModel = db.coins;

@Service()
export default class CoinService {
  

  async getCoinById(id:any){
      return await CoinModel.findById(id);
  }
  
}
