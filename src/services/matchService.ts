import { Service } from "typedi";
import mongoose = require("mongoose");
import config from "../config";
var bcrypt = require("bcryptjs");
const db = require("../models");
const matchStatus = config.matchStatus;
const GameTransactionModel = db.gameTransaction;
const MatchModel = db.match;
const ScoreModel = db.score;
const UserModel = db.user;
//TODO handel message error
@Service()
export default class MatchService {
  async canCreateOrJoin(userId: any, amount: any) {
    const isExists = await MatchModel.find({
      status: { $ne: matchStatus.finished },
      players: userId,
    });
    const user = await UserModel.findById(userId);
    if (user.wallet < amount) return { message: "Insufficient amount" };
    console.table(isExists);
    if (isExists.length != 0) {
      const game = isExists[isExists.length - 1];
      const score = await this.getScoresByUserAndGameId(userId, game._id);
      console.log(game, score);
      if (score == null) return { message: "You are arealdy in game" };
    }
    return null;
  }

  async save(gameBody: any) {
    const canCreate = await this.canCreateOrJoin(
      gameBody.userId,
      gameBody.amount
    );
    if (canCreate) return canCreate;
    const game = new MatchModel({
      name: gameBody.name,
      free: gameBody.free,
      amount: gameBody.amount,
      draw3: parseInt(gameBody.draw3),
      private: gameBody.password ? true : false,
      capacity: gameBody.capacity,
      password: gameBody.password
        ? bcrypt.hashSync(gameBody.password, 8)
        : null,
      players: [gameBody.userId],
    });

    return game
      .save()
      .then((t: any) => t.populate("players", "photo name").execPopulate());
  }

  async gameEnd(game_id: any) {
    const game = await MatchModel.findById(game_id);

    game.status = matchStatus.finished;
    game.save();
    return game;
  }

  async myGames(_id: any) {
    const games = await ScoreModel.find({ player: _id, match: { $ne: null } })
      .sort({ createdAt: -1 })
      .populate("match", "amount name");
    return games;
  }

  async getMatchByUser(_id: any) {
    const myRoom = await MatchModel.findOne({ players: _id })
      .sort({ createdAt: -1 })
      .populate("players", "photo name");
    return myRoom;
  }

  async getAll() {
    const all = await MatchModel.find({}).sort("-createdAt");
    return all;
  }

  async join(details: any) {
    const game = await MatchModel.findById(details._id);
    const canCreate = await this.canCreateOrJoin(details.userId, game.amount);
    if (canCreate) return canCreate;

    var passwordIsValid = game.private
      ? bcrypt.compareSync(details.password, game.password)
      : false;

    if (!game) return { message: "Game not found" };
    if (
      ((game.private && passwordIsValid) || !game.private) &&
      game.players.length != game.capacity &&
      !game.players.includes(details.userId)
    ) {
      game.players = [...game.players, details.userId];
      if (game.players.length == game.capacity) {
        game.status = matchStatus.process;
      }
      return await game
        .save()
        .then((t: any) => t.populate("players", "photo name").execPopulate());
    }

    return { message: "Please verify your information" };
  }

  async unJoin(details: any) {
    const game = await MatchModel.findById(details._id);
    if (!game) return null;
    game.players = game.players.filter(
      (playerId: any) => playerId != details.userId
    );
    game.status = matchStatus.open;
    return await game.save();
  }

  async getOpen() {
    const all = await MatchModel.find({
      private: false,
      status: matchStatus.open,
    }).sort("-createdAt");
    return all;
  }

  async addUpdateScore(data: any) {
    let score = null;
    if (data.scoreId) {
      score = ScoreModel.findById(data.scoreId);
      score.score = data.score;
    } else {
      score = new ScoreModel({
        score: data.score,
        time: data.time,
        player: data.player,
        match: data.match,
      });
    }

    return await score.save();
  }

  async getFinishedRoomById(id: any) {
    return await MatchModel.findOne({
      _id: id,
      status: matchStatus.finished,
    }).populate("players", "photo name");
  }

  async getScoreById(id: any) {
    return await ScoreModel.findById(id);
  }

  async getScoreByGameId(id: any) {
    return await ScoreModel.find({ match: id })
      .sort({ score: -1, time: 1 })
      .populate("player", "photo name");
  }

  async getScoresByUserId(id: any) {
    return await ScoreModel.find({ player: id });
  }

  async getScoresByUserAndGameId(userid: any, gameId: any) {
    return await ScoreModel.findOne({ match: gameId, player: userid });
  }

  async deleteCurrentRoom(userId: any) {
    const game = await MatchModel.findOne({
      players: userId,
      status: matchStatus.open,
    });
    if (!game) {
      return { message: "Game Not Found" };
    }
    if (game.players[0] != userId) {
      return { message: "Cannot remove this game" };
    }

    return MatchModel.deleteOne({ _id: game._id });
  }

  deleteGame(_id: any) {
    return MatchModel.deleteOne({ _id });
  }

  async saveTransaction(gameBody: any) {
    const isExists = await MatchModel.find({
      status: { $ne: matchStatus.finished },
      _id: gameBody.gameId,
    });
    if (isExists.length == 0) {
      return { message: "Game Not found" };
    }
    const gameT = new GameTransactionModel({
      amount: isExists[0].amount,
      game: gameBody.gameId,
      players: gameBody.userId,
    });

    return gameT.save();
  }

  async getTransactions() {
    return GameTransactionModel.find({}).sort("-createdAt");
  }
}
