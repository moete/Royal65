
import { Service } from 'typedi';
import config from '../config';
const db = require("../models");
const MailModel = db.mails;

//TODO handel message error
@Service()
export default class MailService {


    async save(mailBody:any){
        const mail = new MailModel({
            subject: mailBody.subject,
            message: mailBody.message,
            status: mailBody.status,
            to: mailBody.to
          });
        
        return mail.save()
    }
    

    async update(_id:any,mailBody:any){

        return MailModel.findOneAndUpdate({_id},mailBody, {
          new: true
        })
    }
    
    async getById(_id:any){
      const all =await MailModel.findById(_id).sort( '-createdAt' )
      return  all;
    }
    
    async getAll(){
      const all =await MailModel.find({}).sort( '-createdAt' )
      return  all;
    }
    
    
    deleteMail(_id:any){
        return MailModel.deleteOne({ _id });
    }
    

}
