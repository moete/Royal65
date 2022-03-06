
import { Service } from 'typedi';
const db = require("../models");
const PasswordModal = db.Forgotpassword;

//TODO handel message error
@Service()
export default class ForgotPasswordService {

    async save(PasswordBody:any){
        const forgotPassword = new PasswordModal({
            email: PasswordBody.email,
            token: PasswordBody.token,
          });
        
        return forgotPassword.save()
    }
    
    
    deleteMail(email:any){
        return PasswordModal.deleteMany(
          {
            email: {
              $in:email
            }
          });
    }

     getforgotpasswordbyToken(token:any)
  {
    return PasswordModal.findOne({token:token});
    
  }
    

}
