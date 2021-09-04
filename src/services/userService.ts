import { Service } from 'typedi';
import { IUser } from "../interfaces/IUser";
const db = require("../models");
var bcrypt = require("bcryptjs");
const UserModel = db.user;
const EmailModel = db.emailVerification;
const RoleModel = db.role;
@Service()
export default class UserService {

    async checkDuplicate(email:string,username:string){
       const user = await  UserModel.findOne({$or: [
        {email: email},
        {username: username}
    ]})
        return user;
    }

    async save(userBody:IUser){
        let user = new UserModel({
            email: userBody.email,
            name: userBody.name,
            address: userBody.address,
            country: userBody.country,
            username: userBody.username,
            photo: userBody.photo,
            Code: userBody.Code,
            password: bcrypt.hashSync(userBody.password, 8)
          });

        user=await user.save()
        if(user){
          const email=new EmailModel({
            email:user.email,
            token:Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)
          })
          email.save()
        }
        
        return user
    }

    
    async updateAdmin(_id:any,userBody:IUser){
      console.log(userBody, " *********")
      return UserModel.findOneAndUpdate({_id},userBody, {
        new: true
      })
  }

    async update(_id:any,userBody:any){

      return UserModel.findOneAndUpdate({_id},userBody, {
        new: true
      })
    }
  
            
      
    

    findOneByEmailOrUsername(param:string){
        return UserModel.findOne(
          {$or:[ {'email':param}, {'username':param}]})
            .populate("roles", "-__v")
    }
    
    findOneByEmail(param:string){
      return UserModel.findOne({'email':param})
  }

    async count(){
      const count:Number =await UserModel.countDocuments({})
      return  count;
    }

    

    async getLastRegistred(){
      const role=await RoleModel.findOne({name:"user"})
      const last =await UserModel.find({roles:role._id}).sort( '-createdAt' )
      .limit(10)
      return  last;
    }
    
    async getAllUsers(){
      const role=await RoleModel.findOne({name:"user"})
      const last =await UserModel.find({roles:role._id}).sort( '-createdAt' )
      return  last;
    }

    
    async getAllUsersEmails(){
      const role=await RoleModel.findOne({name:"user"})
      const last =await UserModel.find({roles:role._id},'email').sort( '-createdAt' )
      return  last;
    }

    
    async getVerfiedUsersEmails(){
      const role=await RoleModel.findOne({name:"user"})
      const last =await UserModel.find({roles:role._id,verified:true},'email').sort( '-createdAt' )
      return  last;
    }

    
    async statistcsByCountry(){
      const stat =await UserModel.aggregate([{
        $group: {
            "_id": "$country",
            "count": { $sum: 1 }
        }
    },
    { $sort: { count: -1 }},
    { $limit : 3 }])
      return  stat;
    }

    async getEmailVerfication(email:string,token:string){
      const val =await EmailModel.findOne({email,token})
      return  val;
    }

  
    deleteUser(_id:any){
      return UserModel.deleteOne({ _id });
    }
  
    async deleteEmailVerfication(_id:any){
      const val =await EmailModel.deleteOne({ _id }, function (err:any) {
        if (err) return console.log(err);
        // deleted at most one tank document
      });
    }

    async getUserByCode(Code:String){
      const ref = await UserModel.find({Code});
    }
  
}
