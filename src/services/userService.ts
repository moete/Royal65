
import { Service } from 'typedi';
import config from '../config';
import { IUser } from "../interfaces/IUser";
const db = require("../models");
var bcrypt = require("bcryptjs");
const userNbPerPage:number=config.userNbPerPage
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
      const last =await UserModel.find({roles:role._id}).sort( '-createdAt' ).skip(userNbPerPage*page)
      .limit(userNbPerPage)
      return  last;
    }

}
