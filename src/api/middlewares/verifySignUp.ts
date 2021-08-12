
import  Services from "../../services/"

const db = require("../../models");
const ROLES = db.ROLES;
const userService:any=new Services.UserService()
const roleService:any=new Services.RoleService()
const checkDuplicateUsernameOrEmail  = async (req:any, res:any, next:any) => {
    const userDTO = req.body;
    const user=await userService.checkDuplicate(userDTO.email,userDTO.username);
    if(user){
      
      return   res.status(400).send({ message: "Failed! Username or Email is already in use!" });
    }

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
  checkDuplicateUsernameOrEmail ,
    checkRolesExisted
  };
  