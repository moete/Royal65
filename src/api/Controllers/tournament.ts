import { Request, Response } from "express";
import Services from "../../services";

const tournamentService : any = new Services.TournamentService() ; 

const Addtournament = (req : Request , res : Response) => {
    try {
        const tournament = tournamentService.save({
            title : req.body.title,
            price : req.body.price,
            status : req.body.status,
            start_date : req.body.start_date,
            end_time : req.body.end_time,
            entry_fee : req.body.entry_fee,
            capacity : req.body.capacity,
            description : req.body.description

        })
        if(tournament.message) {
            return res.status(400).send(tournament);
        }
        tournament
        .then((succ: any) => {
          res.status(200).send({ message: "tournament successfully created" });
        })
        .catch((err: any) => {
          console.log(err);
          res.status(500).send({ message: "Please Verify tournament information!" });
        });
    }
    catch {

    }
}
const getAllTournaments= async (req:Request, res:Response) => {

    res.status(200).send({data:await tournamentService.getAllTournaments()});
  };

export default {
    Addtournament,
    getAllTournaments
}