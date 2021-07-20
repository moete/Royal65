import { Container } from 'typedi';
import  UserService from "../../services/userService"
import  RoleService from "../../services/roleService"

const db = require("../../models");
const ROLES = db.ROLES;
const userService:any=Container.get(UserService)
const roleService:any=Container.get(RoleService)
const checkDuplicateEmail = async (req:any, res:any, next:any) => {
    const userDTO = req.body;
    const user=await userService.getByEmail(userDTO.email);

    if(user)
    return   res.status(400).send({ message: "Failed! Username or Email is already in use!" });

    return  next();
}
const checkRolesExisted =(req:any, res:any, next:any) => {
  if (req.body.roles) {
      if (!roleService.checkRolesExisted(req.body.roles)) {
        return  res.status(400).send({
          message: `Failed! Roles does not exist!`
        });
      }
    
  }

  return  next();
};

module.exports = {
    checkDuplicateEmail,
    checkRolesExisted
  };
  