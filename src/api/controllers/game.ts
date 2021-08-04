
import {  Request, Response } from 'express';
import { Container } from 'typedi';
import  Services from "../../services/"
const gameService:any=Container.get(Services.GameService)


    const save= async (req:Request, res:Response) => {
        try{
            const game=gameService.save({
                amount: req.body.amount,
                players: req.body.players,
                free: req.body.free,
                status: req.body.status,
                password: req.body.password,
                capacity: req.body.capacity
            })
        
            game.then(
                (succ:any)=>{
        
                    res.status(200).send({message:"Game successfully created"});
            }
            ).catch((err:any)=>{
        
                console.log(err);
                res.status(500).send({ message: "Please Verify your information!" });
            })
        }catch(err:any){res.status(500).send({ message: "An error has occurred!" });}
   
    };


  
    const getAll= async (req:Request, res:Response) => {
            
        try{
            const page=req.params.page
            res.status(200).send({data:await gameService.getAll(page)});
        }catch(err:any){res.status(500).send({ message: "An error has occurred!" });}
       
    };
    
  
    const join= async (req:Request, res:Response) => {
        
        try{
            const game=await gameService.join({
                _id:req.body._id,
                password:req.body.password,
                userId:req.body.userId,
            })
            if(game)
                res.status(200).send({message:"You Are successfully joined"});
            else
                res.status(400).send({message:"Please Verify your information!"});
        }catch(err:any){res.status(500).send({ message: "An error has occurred!" });}
       

    };

    const unJoin= async (req:Request, res:Response) => {
            
        try{

            const game=await gameService.join({
                _id:req.body._id,
                userId:req.body.userId,
            })
            if(game)
                res.status(200).send({message:"You Are successfully joined"});
            else
                res.status(400).send({message:"Please Verify your information!"});
        }catch(err:any){res.status(500).send({ message: "An error has occurred!" });}

    };
    
    const getOpen= async (req:Request, res:Response) => {
            
        try{

            const page=req.params.page
            res.status(200).send({data:await gameService.getOpen(page)});
        }catch(err:any){res.status(500).send({ message: "An error has occurred!" });}

    };
    
    const addUpdateScore= async (req:Request, res:Response) => {
        
        try{
            const score=await gameService.addUpdateScore({
                scoreId:req.body.scoreId,
                score1:req.body.score1,
                score2:req.body.score2,
                team2:req.body.team2,
                team1:req.body.team1,
                game:req.body.game,
            })
            
            if(score)
                res.status(200).send({message:"Updated successfully"});
            else
                res.status(400).send({message:"Please Verify your information!"});
        }catch(err:any){res.status(500).send({ message: "An error has occurred!" });}
        
        

    };
    
    
    const getScoreByGameId= async (req:Request, res:Response) => {
        
        try{
            
            const score=await gameService.getScoreByGameId(req.params.id)
            if(score)
                res.status(200);
            else
                res.status(400).send({message:"Please Verify your information!"});

        }catch(err:any){res.status(500).send({ message: "An error has occurred!" });}

    };

    
    const getScoresByUserId= async (req:Request, res:Response) => {
        
        try{
            
            const score=await gameService.getScoresByUserId(req.params.id)
            if(score)
                res.status(200);
            else
                res.status(400).send({message:"Please Verify your information!"});
        }catch(err:any){res.status(500).send({ message: "An error has occurred!" });}

    };
    
export default {
    save,
    getAll,
    join,
    unJoin,
    getOpen,
    addUpdateScore,
    getScoreByGameId,
    getScoresByUserId
  }