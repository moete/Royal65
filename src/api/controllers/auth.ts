import config from "../../config";
import { Request, Response } from "express";
var jwt = require("jsonwebtoken");
import Services from "../../services/";
const fs = require("fs");
var uniqid = require("uniqid");

const userService: any = new Services.UserService();
const roleService: any = new Services.RoleService();
const expiresIn = 86400;
var bcrypt = require("bcryptjs");

const signup = async (req: any, res: Response) => {
  const userDTO = req.body;
  let user = await userService.checkDuplicate(userDTO.email, userDTO.username);
  if (user) {
    /* fs.unlink(req.file.path, (err:any) => {
        if (err) {
          console.error(err)
          return
        }

        //file removed
      })
      */
    return res
      .status(400)
      .send({ message: "Failed! Username or Email is already in use!" });
  }
  /*  let photo=null
    if(req.file)
      photo=req.file.path
    
    user = userService.save({
      email: userDTO.email,
      name: userDTO.name,
      username: userDTO.username,
      address: userDTO.address,
      country: userDTO.country,
      photo,
      // changed code attribute into user
      Code : uniqid(),
      password: userDTO.password
    });
    user.then(
      async (user:any)=>{

          const role=await roleService.findOneByName("user")
          
          user.roles = [role._id];
          user.save((err:any) => {
            if (err) {
              res.status(500).send({ message:  "Something went wrong!" });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
      }
    ).catch((err:any)=>{

      console.log(err);res.status(500).send({ message: "Please Verify your information!" });
    })
  
  };
  
  const signin = (req:Request, res:Response) => {

    console.log(req.body)
    userService.findOneByEmailOrUsername(req.body.username)
      .exec((err:any, user:any) => {
    */
  user = userService.save({
    username: userDTO.username,
    email: userDTO.email,
    //  name: userDTO.name,
    //  address: userDTO.address,
    country: userDTO.country,
    //  photo,
    // changed code attribute into user
    //   Code: shortid.generate(),
    password: userDTO.password,
  });
  user
    .then(async (user: any) => {
      const role = await roleService.findOneByName("user");

      user.roles = [role._id];
      user.save((err: any) => {
        if (err) {
          res.status(500).send({ message: "Something went wrong!" });
          return;
        }

        res.status(200).send({
          message: "You were registered successfully , Try to log In !",
        });
      });
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({ message: "Please Verify your information!" });
    });
};

const signin = (req: Request, res: Response) => {
  let { username, isAdmin, password } = req.body;

  userService.findOneByEmailOrUsername(username).exec((err: any, user: any) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong!" });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    if (!user.verified) {
      return res
        .status(400)
        .send({ message: "You need to verify your account." });
    }
    if (!user.active) {
      return res.status(400).send({ message: "Your account is suspended." });
    }

    if (isAdmin) {
      const getAdmin = user.roles.filter((role: any) => role.name === "admin");
      if (getAdmin.length == 0)
        return res.status(401).send({ message: "Unauthorized" });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Info!",
      });
    }

    var token = jwt.sign({ id: user.id }, config.SECRET, {
      expiresIn, // 24 hours
    });

    var authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      roles: authorities,
      accessToken: token,
      expiresIn,
    });
  });
};

export default {
  signin,
  signup,
};
