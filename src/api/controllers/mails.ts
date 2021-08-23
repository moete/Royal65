
import {  Request, Response } from 'express';
import  Services from "../../services/"
const mailsService:any=new Services.MailService()


const getById= async (req:Request, res:Response) => {

  try{
    
    const _id=req.params.id;
    const mail=await mailsService.getById(_id)
    if(!mail)
      return res.status(400).send({ message: "Mail Not Found!" });
    res.status(200).send({data:mail});
  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

};

const getAll= async (req:Request, res:Response) => {

  try{
    res.status(200).send({data:await mailsService.getAll()});
  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

};
const update=async (req:any, res:Response) => {

  try{
  
    const gameDTO=req.body;     
    const gameInfo:any={
      status: gameDTO.status
    }
    
    
    const mail = mailsService.update(gameDTO._id,gameInfo);
    mail.then(
      async (mail:any)=>{
        res.send({ message: "Mail was updated successfully!" });
      }
    ).catch((err:any)=>{

      console.log(err);res.status(500).send({ message: "Please Verify your information!" });
    })

  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }
  
}

const deleteMail=async (req:any, res:Response) => {

  try{

      const _id=req.params.id;
    
    const mail = mailsService.deleteUser(_id);
    mail.then(
      async (mail:any)=>{

        res.send({ message: "Mail was deleted successfully!" });
      }
    ).catch((err:any)=>{

      console.log(err);res.status(500).send({ message: "Please Verify your information!" });
    })

  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

}



export default {
    getAll,
    update,
    deleteMail,
    getById
  }