
import {  Request, Response } from 'express';

import  Services from "../../services/"

const userService:any=new Services.UserService()

const getLastRegistred= async (req:Request, res:Response) => {
  res.status(200).send({data:await userService.getLastRegistred()});
};
const getAllUsers= async (req:Request, res:Response) => {
    res.status(200).send({data:await userService.getAllUsers()});
};
const count=  async (req:Request, res:Response) => {
  res.status(200).send({data:await userService.count()});
};

const statistcsByCountry= async (req:Request, res:Response) => {
  res.status(200).send({data:await userService.statistcsByCountry()});
};


const findEmailVerification= async (req:Request, res:Response) => {
  const email=req.params.email,token=req.params.token;
  const emailVerf=await userService.getEmailVerfication(email,token),
  user =await userService.findOneByEmail(email);
  console.log(user,emailVerf)
  if(!emailVerf || !user)
    return res.status(400).send({message:"Not Found!"});

  user.verified=true;  
  user.active=true;
  user.save();
  userService.delteEmailVerfication(emailVerf._id);
  res.status(200).send({message:"Account activated successfully!"});
};


export default {
    count,
    getLastRegistred,
    getAllUsers,
    statistcsByCountry,
    findEmailVerification
  }