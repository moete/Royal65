
import { Service } from 'typedi';
import config from '../config';
const db = require("../models");
const nbPerPage:number=config.nbPerPage
const gameStatus=db.gameStatus
const UserModel = db.user;
const GameModel = db.game;
@Service()
export default class GameService {


    save(gameBody:any){
        const game = new GameModel({
            free: gameBody.free,
            amount: gameBody.amount,
            status: gameBody.status,
            private: gameBody.private,
            password: gameBody.password,
            players: [gameBody.userId]
          });
        
        return game.save()
    }
    
    
    async getAll(page:number){
      const all =await GameModel.find({}).sort( '-createdAt' ).skip(nbPerPage*page)
      .limit(nbPerPage)
      return  all;
    }

    async join(details:any){
        const game=await GameModel.findById(details._id)
        if(!game)
            return null;
        if(((game.private && game.password==details.password) || !game.private) && game.players.length!=game.capacity)
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
    
    
    async getOpen(page:number){
        const all =await GameModel.find({private:false,status:gameStatus.open}).sort( '-createdAt' ).skip(nbPerPage*page)
        .limit(nbPerPage)
        return  all;
    }

}
