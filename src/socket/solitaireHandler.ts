import Solitaire from "../games/solitaire";
import { GET_STATE,JOIN_SOLITAIRE_GAME,GAME_END,NEW_SOLITAIRE_GAME,START_GAME,INIT_STATE,UNKNOWN_ROOM,TOO_MANY_PLAYERS} from "../config/types";

import  Services from "../services/"
const matchService:any=new Services.MatchService()

const solitaire = new Solitaire();

module.exports = (io: any, client: any) => {

    const handleNewSolitaireGame = (payload: any) => {
        console.log(payload," handleNewSolitaireGame ",payload.room_id)
        let roomName = payload.room_id;
        solitaire.newGame(payload.client, roomName)

    }
    const handleGameEnd = async (payload: any) => {
        const state=solitaire.getState(payload.roomName)
        let scoreData=null
        console.log("ff ",state==null,payload.roomName,payload)
        if(state.playerOne.clientId==payload.clientId){
            state.playerOne.score=payload.score
            scoreData=state.playerOne
         
        }
        else if(state.playerTwo.clientId==payload.clientId){
            state.playerTwo.score=payload.score
            scoreData=state.playerTwo
        }
        if(scoreData){
            await matchService.addUpdateScore({
                score:scoreData.score.score,
                time:scoreData.score.pretyTime,
                player:scoreData.clientId,
                match:payload.roomName,
            })
            
            solitaire.setState(payload.roomName,state)
        }

        if(state.playerOne.score && state.playerTwo.score){
            state.finish=true
            console.log("GAME END ",solitaire.getState(payload.roomName))
            const clients:any=[];
            clients.push(state.playerOne,state.playerTwo)
            clients.sort(function(a:any,b:any){
                if ( a.score.score < b.score.score ){
                    return 1;
                  }
                  if ( a.score.score > b.score.score ){
                    return -1;
                  }
                  if ( a.score.pretyTime < b.score.pretyTime ){
                    return -1;
                  }
                  if ( a.score.pretyTime > b.score.pretyTime ){
                    return 1;
                  }
                
                  return 0;
            })
            const game=await matchService.gameEnd(payload.roomName)
            clients.forEach(async (elem:any)=>{
                    io.emit(elem.clientId,{type:GAME_END,data:{clients,amount:game.amount,id:game._id}});

            })
            
            solitaire.removeGame(payload.roomName,clients);
            return;
        }

    }
    const handleGetState = (payload: any) => {
        const room=solitaire.getState(payload.roomName)
        console.log(payload.roomName,room=== undefined)
        if(room === undefined){
            io.emit(payload.userId,{type:INIT_STATE,data:null});
            return;
        }
        if(!room.finish && ( room.playerOne.clientId == payload.userId && !room.playerOne.score || room.playerTwo.clientId == payload.userId && !room.playerTwo.score  ))
            io.emit(payload.userId,{type:INIT_STATE,data:room});
        else
            io.emit(payload.userId,{type:INIT_STATE,data:null});

    }
    const handleJoinSolitaireGame = (payload: any) => {
        console.log(payload," handleJoinSolitaireGame")
        const room = solitaire.getState(payload.roomName);
        if(!room){
            io.emit(payload.client._id,{type:UNKNOWN_ROOM});
            console.log("UNKNOWN_ROOM")
            return
        }
        if (room.playerOne.clientId && room.playerTwo && room.playerTwo.clientId  ) {
            io.emit(payload.client._id,{type:TOO_MANY_PLAYERS});
            console.log("TOO_MANY_PLAYERS")
            return;
        }
        solitaire.joinGame(payload.client, payload.roomName)
        const clients=solitaire.getClientInRoomName(payload.roomName);
        clients.forEach((clientId:any)=>{
            io.emit(clientId,{type:START_GAME,data:{
                game:payload.roomName,
                userId:clientId
            }});
        })
    }

    client.on(NEW_SOLITAIRE_GAME, handleNewSolitaireGame);
    client.on(JOIN_SOLITAIRE_GAME, handleJoinSolitaireGame);
    client.on(GAME_END, handleGameEnd);
    client.on(GET_STATE, handleGetState);

}
