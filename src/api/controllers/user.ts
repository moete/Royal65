
import {  Request, Response } from 'express';
import { Container } from 'typedi';
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

export default {
    count,
    getLastRegistred,
    getAllUsers,
    statistcsByCountry
  }