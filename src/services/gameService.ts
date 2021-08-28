
import { Service } from 'typedi';
import config from '../config';
const db = require("../models");
const gameStatus=config.gameStatus
const GameTransactionModel = db.gameTransaction;
const GameModel = db.game;
const ScoreModel = db.score;
//TODO handel message error
@Service()
export default class GameService {


    async save(gameBody:any){
        const isExists=await GameModel.find({status:{$ne:gameStatus.finished},players:gameBody.userId})
        if(isExists.length !=0){
            return {message:"You are arealdy in game"};
        }
        const game = new GameModel({
            free: gameBody.free,
            amount: gameBody.amount,
            private: gameBody.private,
            password: gameBody.password,
            players: [gameBody.userId]
          });
        
        return game.save()
    }
    
    
    async getAll(){
      const all =await GameModel.find({}).sort( '-createdAt' )
      return  all;
    }

    async join(details:any){
        const game=await GameModel.findById(details._id)
        if(!game)
            return null;
        if(((game.private && game.password==details.password) || !game.private) && game.players.length!=game.capacity && !game.players.includes(details.userId))
        {
                game.players=[...game.players,details.userId]
                if(game.players.length==game.capacity)
                    game.status=gameStatus.process;
                return await game.save()
        }

        return null;
    }



    async unJoin(details:any){
        const game=await GameModel.findById(details._id)
        if(!game)
            return null;
        game.players=game.players.filter((playerId:any)=>playerId!=details.userId)
        game.status=gameStatus.open;
        return await game.save()
    }
    
    
    async getOpen(){
        const all =await GameModel.find({private:false,status:gameStatus.open}).sort( '-createdAt' )
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
                player:data.player,
                game:data.game,
            })
        }

        return await score.save();
    }

    async getScoreById(id:any){
        return await ScoreModel.findById(id);
    }

    async getScoreByGameId(id:any){
        return await ScoreModel.findOne({game:id});
    }

    async getScoresByUserId(id:any){
        return await ScoreModel.find()
        .or([{ team1: id}, { team2: id }]);
    }

    
    deleteGame(_id:any){
        return GameModel.deleteOne({ _id });
    }

    
    async saveTransaction(gameBody:any){
        const isExists=await GameModel.find({status:{$ne:gameStatus.finished},_id:gameBody.gameId})
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
