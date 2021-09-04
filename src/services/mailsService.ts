
import { Service } from 'typedi';
import config from '../config';
const db = require("../models");
const MailModel = db.mails;

//TODO handel message error
@Service()
export default class MailService {

    async save(mailBody:any){
        const mail = new MailModel({
          email_subject: mailBody.email_subject,
          email_content: mailBody.email_content,
          folder: mailBody.folder,
          read: mailBody.read,
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
    
    
    deleteMail(listId:any){
        return MailModel.deleteMany(
          {
            _id: {
              $in:listId
            }
          });
    }
    

}
