
import {  Request, Response } from 'express';
import { IUser } from '../../interfaces/IUser';
import  Services from "../../services"
const nodemailer = require("nodemailer");
const mailerService:any=new Services.MailerService()
const mailService:any=new Services.MailService()
const userService:any=new Services.UserService()


const getLastRegistred= async (req:Request, res:Response) => {

  try{
    res.status(200).send({data:await userService.getLastRegistred()});
  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

};
const getAllUsers= async (req:Request, res:Response) => {

  try{
    res.status(200).send({data:await userService.getAllUsers()});
  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

};
const getAllUsersEmails= async (req:Request, res:Response) => {

  try{
    res.status(200).send({data:await userService.getAllUsersEmails()});
  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

};
const count=  async (req:Request, res:Response) => {

  try{
    res.status(200).send({data:await userService.count()});
  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

};

const statistcsByCountry= async (req:Request, res:Response) => {

  try{
    res.status(200).send({data:await userService.statistcsByCountry()});
  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

};

const blockUnblock=async (req:any, res:Response) => {

  try{

    const userDTO=req.body;
    const user = userService.update(userDTO._id,{active:!userDTO.active});
    user.then(
      async (user:any)=>{
        res.send({ message: "User was updated successfully!" });
      }
    ).catch((err:any)=>{

      console.log(err);res.status(500).send({ message: "Please Verify your information!" });
    })

  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

}

const update=async (req:any, res:Response) => {

  try{
  
    const userDTO=req.body;    
    console.log(userDTO)
    const userInfo:any={
      name: userDTO.name,
      address: userDTO.address,
      country: userDTO.country,
      email: userDTO.email,
    }
    if(req.file)
      userInfo.photo=req.file.path
    
    const user = userService.update(userDTO._id,userInfo);
    user.then(
      async (user:any)=>{
        res.send({ message: "User was updated successfully!" });
      }
    ).catch((err:any)=>{

      console.log(err);res.status(500).send({ message: "Please Verify your information!" });
    })

  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }
  
}

const deleteUser=async (req:any, res:Response) => {

  try{

      const _id=req.params.id;
    
    const user = userService.deleteUser(_id);
    user.then(
      async (user:any)=>{

        res.send({ message: "User was deleted successfully!" });
      }
    ).catch((err:any)=>{

      console.log(err);res.status(500).send({ message: "Please Verify your information!" });
    })

  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

}

const findEmailVerification= async (req:Request, res:Response) => {

  try{

    const email=req.params.email,token=req.params.token;
    const emailVerf=await userService.getEmailVerfication(email,token),
    user =await userService.findOneByEmail(email);
    console.log(user,emailVerf)
    if(!emailVerf || !user)
      return res.status(400).send({message:"Not Found!"});

    user.verified=true;  
    user.active=true;
    user.save();
    userService.deleteEmailVerfication(emailVerf._id);
    res.status(200).send({message:"Account activated successfully!"});
    
  }catch(err:any){
    res.status(500).send({ message: "An error has occurred!" });
  }

};



const send= async (req:any, res:Response) => {
  try{
      const body=req.body,to:any=[];
      if(body.to==1){
        const emails=await userService.getAllUsersEmails()
        console.log(emails)
        to.push(...emails.map((val:any)=>val.email))
      }
      else if(body.to==2){
        const emails=await userService.getVerfiedUsersEmails()
        to.push(...emails.map((val:any)=>val.email))
      }
      else
        to.push(body.individualValue)
      const mailOption={
          from: '"Royal65 Contact 👻" <contact@boitesetmoteurs.com>', // sender address
          to, // list of receivers
          subject:  body.subject, // Subject line
          html:  body.message, // html body
        }

      mailerService.send(mailOption,(error: Error, info: any) => {
        if (error) {
            res.status(500).send({ message: "An error has occurred while sending!" })  
          return console.log(error,"*********************");
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        mailService.save({
          email_subject: mailOption.subject,
          email_content: mailOption.html,
          folder: 0,
          read:false,
          to
        })
        res.status(200).send({ message: "Successfully sent email" })
      })
      
      
  }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}

};






export default {
    count,
    getLastRegistred,
    getAllUsers,
    statistcsByCountry,
    findEmailVerification,
    update,
    deleteUser,
    blockUnblock,
    getAllUsersEmails,
    send
  }