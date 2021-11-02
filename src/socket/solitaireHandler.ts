import Solitaire from "../games/solitaire";
import { GET_STATE,JOIN_SOLITAIRE_GAME,GAME_END,NEW_SOLITAIRE_GAME,START_GAME,INIT_STATE,UNKNOWN_ROOM,TOO_MANY_PLAYERS} from "../config/types";

import  Services from "../services/"
const matchService:any=new Services.MatchService()

const solitaire = new Solitaire();

module.exports = (io: any, client: any) => {

    const handleNewSolitaireGame = (payload: any) => {
        console.log(payload," ********** ")
        let roomName = payload.room_id;
        solitaire.newGame(payload.client_id, roomName)
        client.join(roomName)

    }
    const handleGameEnd = async (payload: any) => {
        const state=solitaire.getState(payload.roomName)
        console.log("ff ",state==null,payload.roomName,payload)
        if(state.playerOne.clientId==payload.clientId)
            state.playerOne=payload
        else if(state.playerTwo.clientId==payload.clientId)
            state.playerTwo=payload

        if(state.playerOne.score && state.playerTwo.score){
            state.finish=true
            console.log("GAME END ",solitaire.getState(payload.roomName))
            const clients=[];
            clients.push(state.playerOne,state.playerTwo)
            const game=await matchService.gameEnd(payload.roomName)
            clients.map(async (elem:any)=>{
                console.log("elem ",elem)
                const score=await matchService.addUpdateScore({
                    score:elem.score.score,
                    time:elem.score.pretyTime,
                    player:elem.clientId,
                    match:elem.roomName,
                })
                
                if(score){
                    io.emit(elem.clientId,{type:GAME_END,data:game});
                    return score;
                }
                else
                    console.log("Error when  updating score : - state : ",state,", roomName : ",payload.roomName)

            })
            
            solitaire.removeGame(payload.roomName,clients);
            return;
        }
        else   
            solitaire.setState(payload.roomName,state)

    }
    const handleGetState = (payload: any) => {
        const room=solitaire.getState(payload.roomName)
        console.log(payload.roomName,room=== undefined)
        if(room === undefined){
            io.emit(payload.userId,{type:INIT_STATE,data:null});
            return;
        }
        const state=room.state
        if(!state.finish)
            io.emit(payload.userId,{type:INIT_STATE,data:state});
        else
            io.emit(payload.userId,{type:INIT_STATE,data:null});

    }
    const handleJoinSolitaireGame = (payload: any) => {
        console.log(payload," handleJoinSolitaireGame")
        const room = io.sockets.adapter.rooms.get(payload.roomName);
        if(room=== undefined){
            io.emit(payload.client_id,{type:UNKNOWN_ROOM});
            return
        }
        let numClients = room.size;

        if (numClients === 0) {
            io.emit(payload.client_id,{type:UNKNOWN_ROOM});
            return;
        } else if (numClients > 1) {
            io.emit(payload.client_id,{type:TOO_MANY_PLAYERS});
            return;
        }
        client.join(payload.roomName)
        solitaire.joinGame(payload.client_id, payload.roomName)
        const clients=solitaire.getClientInRoomName(payload.roomName);
        console.table(clients)
        clients.map((clientId:any)=>{
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
