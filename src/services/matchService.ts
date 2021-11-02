
import { Service } from 'typedi';
import config from '../config';
var bcrypt = require("bcryptjs");
const db = require("../models");
const matchStatus=config.matchStatus
const GameTransactionModel = db.gameTransaction;
const MatchModel = db.match;
const ScoreModel = db.score;
//TODO handel message error
@Service()
export default class MatchService {


    async save(gameBody:any){
        const isExists=await MatchModel.find({status:{$ne:matchStatus.finished},players:gameBody.userId})
        if(isExists.length !=0){
            return {message:"You are arealdy in game"};
        }
        const game = new MatchModel({
            free: gameBody.free,
            amount: gameBody.amount,
            private: gameBody.private,
            capacity: gameBody.capacity,
            password: gameBody.password ? bcrypt.hashSync(gameBody.password, 8) : null,
            players: [gameBody.userId]
          });
        
        return game.save()
    }
    
    async gameEnd(game_id:any){
        const game=await MatchModel.findById(game_id)

        game.status=matchStatus.finished
        game.save()
        return game;
    }
    
    async getMatchByUser(_id:any){
        const myRoom =await MatchModel.findOne({players:_id}).sort({createdAt: -1})
        .populate("players","photo name")
        return  myRoom;
      }
  
    
    async getAll(){
      const all =await MatchModel.find({}).sort( '-createdAt' )
      return  all;
    }

    async join(details:any){
        const game=await MatchModel.findById(details._id);

        var passwordIsValid =details.password ? bcrypt.compareSync(
            details.password,
            game.password
          )
          :
          false;
    
        if(!game)
            return null;
        if(((game.private && passwordIsValid) || !game.private) && game.players.length!=game.capacity && !game.players.includes(details.userId))
        {
                game.players=[...game.players,details.userId]
                if(game.players.length==game.capacity)
                    game.status=matchStatus.process;
                return await game.save().then((t:any) => t.populate("players","photo name").execPopulate())
        }

        return null;
    }



    async unJoin(details:any){
        const game=await MatchModel.findById(details._id)
        if(!game)
            return null;
        game.players=game.players.filter((playerId:any)=>playerId!=details.userId)
        game.status=matchStatus.open;
        return await game.save()
    }
    
    
    async getOpen(){
        const all =await MatchModel.find({private:false,status:matchStatus.open}).sort( '-createdAt' )
        return  all;
    }

    async addUpdateScore(data:any){
        let score=null;
        if(data.scoreId){
            score=ScoreModel.findById(data.scoreId);
            score.score=data.score
        }else{
            score=new ScoreModel({
                score:data.score,
                time:data.time,
                player:data.player,
                match:data.match,
            })
        }

        return await score.save();
    }

    async getScoreById(id:any){
        return await ScoreModel.findById(id);
    }

    async getScoreByGameId(id:any){
        return await ScoreModel.find({});
    }

    async getScoresByUserId(id:any){
        return await ScoreModel.find()
        .or([{ team1: id}, { team2: id }]);
    }

    
    deleteGame(_id:any){
        return MatchModel.deleteOne({ _id });
    }

    
    async saveTransaction(gameBody:any){
        const isExists=await MatchModel.find({status:{$ne:matchStatus.finished},_id:gameBody.gameId})
        if(isExists.length ==0){
            return {message:"Game Not found"};
        }
        const gameT = new GameTransactionModel({
            amount: isExists[0].amount,
            game: gameBody.gameId,
            players: gameBody.userId
          });
        
        return gameT.save()
    }
    
    
    async getTransactions(){
        return GameTransactionModel.find({}).sort( '-createdAt' )
    }
    
    


}
