
import { Service } from 'typedi';
import config from '../config';
import { IUser } from "../interfaces/IUser";
const db = require("../models");
var bcrypt = require("bcryptjs");
const nbPerPage:number=config.nbPerPage
const UserModel = db.user;
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

    save(userBody:IUser){
        const user = new UserModel({
            email: userBody.email,
            name: userBody.name,
            address: userBody.address,
            country: userBody.country,
            username: userBody.username,
            password: bcrypt.hashSync(userBody.password, 8)
          });
        
        return user.save()
    }

    findOneByEmail(email:string){
        return UserModel.findOne({
            email
          })
            .populate("roles", "-__v")
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
    
    async getAllUsers(page:number){
      const role=await RoleModel.findOne({name:"user"})
      const last =await UserModel.find({roles:role._id}).sort( '-createdAt' ).skip(nbPerPage*page)
      .limit(nbPerPage)
      return  last;
    }

    
    async statistcsByCountry(){
      const stat =await UserModel.aggregate([{
        $group: {
            "_id": "$country",
            "count": { $sum: 1 }
        }
    }])
      return  stat;
    }
}
