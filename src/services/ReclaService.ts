import { Service } from "typedi";
import { IRecla, IReclaDto } from "../interfaces/IRecla";
const db = require("../models");
const ReclaModel = db.recla ;

@Service()
export default class ReclaService {

  save(ReclaBody: IRecla) {
    const recla = new ReclaModel({
      name: ReclaBody.name,
      subject: ReclaBody.subject,
      message: ReclaBody.subject,
    });

    return recla.save();
  }

    async getAllReclas() {
    return await ReclaModel.find();
  }


}
