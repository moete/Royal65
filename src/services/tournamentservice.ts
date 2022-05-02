import config from "../config";
import { Service } from "typedi";
import { Itournament } from "../interfaces/ITournament";
const db = require("../models");
const TournamentModel = db.tournament;
const TournamentTransactionModel = db.tournamenttransaction;
const UserModel = db.user;
const TournamentUserJoinModel = db.tournamentuserjoin;
const tournamentStatus = config.tournamentStauts;

Service();
export default class TournamentService {

  async cannotJoin(userId: any, tournament: any, tournamentId: any) {
    if (tournament.players.length >= tournament.capacity) return { message: "Tournament closed!" }
    const isAlreadyJoined = await TournamentUserJoinModel.findOne({
      status: { $ne: tournamentStatus.finished },
      player: userId,
      tournament: tournamentId
    });

    if (isAlreadyJoined) return { message: 'You are already joined!' }
    const user = await UserModel.findById(userId);
    if (user.wallet < tournament.entry_fee) return { message: "Insufficient amount" };

    return null;
  }

  async save(tournamentBody: any) {
    const tournament = new TournamentModel({
      title: tournamentBody.title,
      price: tournamentBody.price,
      status: tournamentBody.status,
      game: tournamentBody.game,
      photo: tournamentBody.photo,
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
    return await TournamentModel.find();
  }
  async getTournamentById(id: any) {
    return await TournamentModel.findById(id);
  }
  async getByTitle(title: String) {
    return await TournamentModel.findOne({ title: "Soolitaire tournament" });
  }
  async getAllActiveTounaments() {
    return await TournamentModel.find({ status: 1 });
  }
  async joinTournament(userId: any, tournamentId: any) {
    const tournamentObj = await TournamentModel.findById(tournamentId);
    const tournament = new TournamentModel(tournamentObj);
    const user = await UserModel.findById(userId);

    if (!tournament) return { message: 'Cannot find tournament!' };
    const cannotJoin = await this.cannotJoin(userId, tournament, tournament._id);
    if (cannotJoin) return cannotJoin;

    const eligibleRounds = tournament.capacity - tournament.players.length;
    const joiningOrder = tournament.players.length + 1;

    const tournamentUserJoin = new TournamentUserJoinModel({
      tournament: tournamentId,
      player : userId,
      joining_order: joiningOrder,
      eligible_rounds_count: eligibleRounds,
    })
    return await tournamentUserJoin.save().then((t: any) => t.populate("player", "tournament").execPopulate());;
  }
  async saveTransaction(tournamentBody: any) {
    const isExists = await TournamentModel.find({
      status: { $ne: tournamentStatus.finished },
      _id: tournamentBody._id,
    });
    if (isExists.length == 0) {
      return { message: "Game Not Found" };
    }
    const TournamentT = new TournamentTransactionModel({
      tournament: tournamentBody._id,
      player: tournamentBody._id,
      amount: isExists[0].amount,
    });
  }
  async deleteTournament(_id: any) {
    return await TournamentModel.deleteOne({ _id });
  }
  async unjoinTournament(details: any) {
    const tournament = await TournamentModel.findById(details._id);
    if (!tournament) return null;
    tournament.players = tournament.players.filter(
      (playerId: any) => playerId != details.userId
    );
    tournament.status = tournament.open;
    return await tournament.save();
  }
  async getOpenTournament() {
    const all = await TournamentModel.find({
      private: false,
      status: tournamentStatus.open,
    });
    return all;
  }
}
