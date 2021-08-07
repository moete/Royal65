import { Service } from 'typedi';
const db = require("../models");

const RoleModel = db.role;
const ROLES=db.ROLES

@Service()
export default class RoleService {
  
    async findByName(roles:string){
        return   RoleModel.find({
        name: { $in: roles }
      })
    }
    
    async findOneByName(role:string){
        return   RoleModel.findOne({
         name: role
       })
     }
     
    checkRolesExisted(roles:string[]){

        for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])) {
              return false;
            }
        }
        return true;
    }


}