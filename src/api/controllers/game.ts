
import {  Request, Response } from 'express';

import  Services from "../../services/"
const gameService:any=new Services.GameService()


    const save= async (req:any, res:Response) => {
        try{
            const game=gameService.save({
                amount: req.body.amount,
                userId: req.userId,
                free: req.body.free,
                status: req.body.status,
                password: req.body.password,
                capacity: req.body.capacity
            })
            if(game.message){
                
               return res.status(400).send(game);
            }
        
            game.then(
                (succ:any)=>{
        
                    res.status(200).send({message:"Game successfully created"});
            }
            ).catch((err:any)=>{
        
                console.log(err);
                res.status(500).send({ message: "Please Verify your information!" });
            })
        }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
   
    };

        

    const deleteGame=async (req:any, res:Response) => {

        try{

            const _id=req.params.id;
            
            const game = gameService.deleteGame(_id);
            game.then(
            async (game:any)=>{

                res.send({ message: "Game was deleted successfully!" });
            }
            ).catch((err:any)=>{
                console.log(err);res.status(500).send({ message: "Please Verify your information!" });
            })

        }catch(err:any){
            console.log(err);
            res.status(500).send({ message: "An error has occurred!" });
        }

    }


  
    const getAll= async (req:Request, res:Response) => {
            
        try{
            
            res.status(200).send({data:await gameService.getAll()});
        }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
       
    };
    
  
    const join= async (req:any, res:Response) => {
        
        try{
            const game=await gameService.join({
                _id:req.body._id,
                password:req.body.password,
                userId:req.userId,
            })
            if(game)
                res.status(200).send({message:"You Are successfully joined"});
            else
                res.status(400).send({message:"Please Verify your information!"});
        }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
       

    };

    const unJoin= async (req:any, res:Response) => {
            
        try{

            const game=await gameService.join({
                _id:req.body._id,
                userId:req.userId,
            })
            if(game)
                res.status(200).send({message:"You Are successfully joined"});
            else
                res.status(400).send({message:"Please Verify your information!"});
        }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}

    };
    
    const getOpen= async (req:Request, res:Response) => {
            
        try{

            
            res.status(200).send({data:await gameService.getOpen()});
        }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}

    };
    
    const addUpdateScore= async (req:Request, res:Response) => {
        
        try{
            const score=await gameService.addUpdateScore({
                scoreId:req.body.scoreId,
                score:req.body.score,
                player:req.body.player,
                game:req.body.game,
            })
            
            if(score)
                res.status(200).send({message:"Updated successfully"});
            else
                res.status(400).send({message:"Please Verify your information!"});
        }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}
        
        

    };
    
    
    const getScoreByGameId= async (req:Request, res:Response) => {
        
        try{
            
            const score=await gameService.getScoreByGameId(req.params.id)
            if(score)
                res.status(200);
            else
                res.status(400).send({message:"Please Verify your information!"});

        }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}

    };

    
    const getScoresByUserId= async (req:Request, res:Response) => {
        
        try{
            
            const score=await gameService.getScoresByUserId(req.params.id)
            if(score)
                res.status(200);
            else
                res.status(400).send({message:"Please Verify your information!"});
        }catch(err:any){console.log(err);res.status(500).send({ message: "An error has occurred!" });}

    };
    
export default {
    save,
    getAll,
    join,
    unJoin,
    getOpen,
    addUpdateScore,
    getScoreByGameId,
    getScoresByUserId,
    deleteGame
  }