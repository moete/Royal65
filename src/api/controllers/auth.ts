import config from '../../config';
import {  Request, Response } from 'express';
var jwt = require("jsonwebtoken");
import  Services from "../../services/"
const fs=require('fs')
const expiresIn=86400;
var bcrypt = require("bcryptjs");

var shortid = require("shortid");

const userService:any=new Services.UserService()
const roleService:any=new Services.RoleService()


const signup = (req:Request, res:Response) => {
    const user = userService.save({
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
      address: req.body.address,
      country: req.body.country,
      password: req.body.password,
      // changed code attribute into user
      Code: shortid.generate()
    });
    user.then(
      async (user:any)=>{

        if (req.body.roles) {
          const roles=await roleService.findByName(req.body.roles)
          
          user.roles = roles.map((role:any) => role._id);
          user.save((err:any) => {
            if (err) {
              res.status(500).send({ message:  "Something went wrong!" });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
        else{
          
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
      }
    ).catch((err:any)=>{

      console.log(err);res.status(500).send({ message: "Please Verify your information!" });
    })
  
  };
  
  const signin = (req:Request, res:Response) => {

    console.log(req.body)
    userService.findOneByEmailOrUsername(req.body.username)
      .exec((err:any, user:any) => {
        if (err) {
          console.log(err);res.status(500).send({ message: "Something went wrong!" });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        console.log(user.verified)
        if(!user.verified){
          return res.status(400).send({ message: "You need to verify your account." });
        }
        if(!user.active){
          return res.status(400).send({ message: "Your account is suspended." });
        }


  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Info!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn // 24 hours
        });
  
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          expiresIn
        });
      });
  };

  
  export default {
    signin,
    signup
  }