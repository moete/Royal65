import { Service } from "typedi";
import { Itournament } from "../interfaces/ITournament";
const db = require('../models');
const tournamentModel = db.tournament ;

Service()
export default class TournamentService {
    save(tournamentBody:Itournament) {
        const tournament = new tournamentModel({
            title :tournamentBody.title ,
            price : tournamentBody.price,
            status : tournamentBody.status,
           start_date : tournamentBody.start_time,
            end_time : tournamentBody.end_time,         
            entry_fee : tournamentBody.entry_fee,
            capacity : tournamentBody.capacity ,
            description : tournamentBody.description
        })
        console.log(tournament)
        return tournament.save();
        
    }
    async getAllTournaments() {
        return await tournamentModel.find() ;
    }
    async getAllActiveTounaments() {
        return await tournamentModel.find({status : 1})
    }

}