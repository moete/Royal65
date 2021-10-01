import config from "../config";
import { Service } from "typedi";
import { Itournament } from "../interfaces/ITournament";
import user from "../api/routes/user";
const db = require("../models");
const tournamentModel = db.tournament;
const TournamentTransactionModel = db.tournamenttransaction;
const userModel = db.user ;
const tournamentStatus = config.tournamentStauts;

Service();
export default class TournamentService {
  save(tournamentBody: any) {
    const tournament = new tournamentModel({
      title: tournamentBody.title,
      price: tournamentBody.price,
      status: tournamentBody.status,
      game :tournamentBody.game,
      start_date: tournamentBody.start_time,
      end_time: tournamentBody.end_time,
      entry_fee: tournamentBody.entry_fee,
      capacity: tournamentBody.capacity,
      description: tournamentBody.description,
    });
    console.log(tournament);
    return tournament.save();
  }
  async getAllTournaments() {
    return await tournamentModel.find();
  }
  async getAllActiveTounaments() {
    return await tournamentModel.find({ status: 1 });
  }
  async joinTournament(active: any) {
    const tournament = await tournamentModel.findById(active._id);
    const UserId = await userModel.findById(active._id);
    let dateObj = active.start_time() - Date.now();
    if (!tournament) return null;

    if (
      (tournament.players.length != tournament.capacity ) &&
      (dateObj == -1) && (UserId.wallet) > (tournament.entry_fee)
    ) {
      tournament.players = [...tournament.players, active.userID];
      if (tournament.players.length == tournament.capacity)
        tournament.status = tournamentStatus.process;
      return await tournament.save();
    }

    return null;
  }
  async saveTransaction(tournamentBody:any) {
      const isExists = await tournamentModel.find({status:{$ne:tournamentStatus.finished},_id:tournamentBody._id})
      if(isExists.length ==0) {
          return {message : "Game Not Found"}
      }
      const TournamentT = new TournamentTransactionModel({
          
        tournament : tournamentBody._id,
        player : tournamentBody._id,
        amount  : isExists[0].amount

      })
  }
  async deleteTournament(_id:any) {
    return await tournamentModel.deleteOne({_id});
  }
}
