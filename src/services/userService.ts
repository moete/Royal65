import { Service } from 'typedi';
import { IUser } from "../interfaces/IUser";
const db = require("../models");
var bcrypt = require("bcryptjs");

const UserModel = db.user;
@Service()
export default class UserService {

    async getByEmail(email:string){
       const user = await  UserModel.findOne({email})
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

}
