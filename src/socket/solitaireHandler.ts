import Solitaire from "../games/solitaire";
import { GET_STATE, JOIN_SOLITAIRE_GAME, GAME_END, NEW_SOLITAIRE_GAME, START_GAME, INIT_STATE, UNKNOWN_ROOM, TOO_MANY_PLAYERS } from "../config/types";

import Services from "../services/"
const matchService: any = new Services.MatchService()

const solitaire = new Solitaire();
const  cronIds:any[]=[];
const noScore={
    score:0,
    pretyTime:"04:00"
}
module.exports = (io: any, client: any) => {

    const handleNewSolitaireGame = (payload: any) => {
        console.log(payload, " handleNewSolitaireGame ", payload.room_id)
        const roomName = payload.room._id;
        const draw3 = payload.room.draw3;
        solitaire.newGame(payload.client, roomName,draw3)

    }
    const handleGameEnd = async (payload: any) => {
        const state = solitaire.getState(payload.roomName)
        let scoreData = null
        console.log("ff ", state == null, payload.roomName, payload)
        if (state.playerOne.clientId == payload.clientId) {
            state.playerOne.score = payload.score
            scoreData = state.playerOne

        }
        else if (state.playerTwo.clientId == payload.clientId) {
            state.playerTwo.score = payload.score
            scoreData = state.playerTwo
        }
        if (scoreData) {
            await matchService.addUpdateScore({
                score: scoreData.score.score,
                time: scoreData.score.pretyTime,
                player: scoreData.clientId,
                match: payload.roomName,
            })

            solitaire.setState(payload.roomName, state)
        }

        if (state.playerOne.score && state.playerTwo.score) {
            handleUpdateGame(payload.roomName)
        }

    }
    
    const handleForceGameEnd = async (payload: any) => {
        const state = solitaire.getState(payload.roomName)
        let scoreData = null
        if (!state.playerOne.score && !state.playerTwo.score ) {
            //TODO
            console.log("UPDATE BOTH")
            return;
        }
        if (!state.playerOne.score) {
            state.playerOne.score = noScore
            scoreData = state.playerOne

        }
        else if (!state.playerTwo.score) {
            state.playerTwo.score = noScore
            scoreData = state.playerTwo
        }
        if (scoreData) {
            await matchService.addUpdateScore({
                score: scoreData.score.score,
                time: scoreData.score.pretyTime,
                player: scoreData.clientId,
                match: payload.roomName,
            })

            solitaire.setState(payload.roomName, state)
        }

        if (state.playerOne.score && state.playerTwo.score) {
            handleUpdateGame(payload.roomName)
        }

    }
    const handleGetState = (payload: any) => {
        const room = solitaire.getState(payload.roomName)
        console.log(payload.roomName, room === undefined)
        if (room === undefined) {
            io.emit(payload.userId, { type: INIT_STATE, data: null });
            return;
        }
        if (!room.finish && (room.playerOne.clientId == payload.userId && !room.playerOne.score || room.playerTwo.clientId == payload.userId && !room.playerTwo.score)) {
            if (!room.startTime) {
                room.startTime = new Date().getTime();
                room.endTime = room.startTime + room.state.options.duration;
                cronIds[payload.roomName]=setTimeout(function () {
                    console.log("cron job")
                    handleForceGameEnd(payload)
                }, room.state.options.duration+20000)
                solitaire.setState(payload.roomName,room)
            }
            io.emit(payload.userId, { type: INIT_STATE, data: room });

        }
        else
            io.emit(payload.userId, { type: INIT_STATE, data: null });

    }


    const handleJoinSolitaireGame = (payload: any) => {
        console.log(payload, " handleJoinSolitaireGame")
        const room = solitaire.getState(payload.roomName);
        if (!room) {
            io.emit(payload.client._id, { type: UNKNOWN_ROOM });
            console.log("UNKNOWN_ROOM")
            return
        }
        if (room.playerOne.clientId && room.playerTwo && room.playerTwo.clientId) {
            io.emit(payload.client._id, { type: TOO_MANY_PLAYERS });
            console.log("TOO_MANY_PLAYERS")
            return;
        }
        solitaire.joinGame(payload.client, payload.roomName)
        const clients = solitaire.getClientInRoomName(payload.roomName);
        clients.forEach((clientId: any) => {
            io.emit(clientId, {
                type: START_GAME, data: {
                    game: payload.roomName,
                    userId: clientId
                }
            });
        })
    }

    const handleUpdateGame = async ( roomName: any) => {
        const state = solitaire.getState(roomName)
        state.finish = true
        console.log("GAME END ", solitaire.getState(roomName))
        const clients: any = [];
        clients.push(state.playerOne, state.playerTwo)
        clients.sort(function (a: any, b: any) {
            if (a.score.score < b.score.score) {
                return 1;
            }
            if (a.score.score > b.score.score) {
                return -1;
            }
            if (a.score.pretyTime < b.score.pretyTime) {
                return -1;
            }
            if (a.score.pretyTime > b.score.pretyTime) {
                return 1;
            }

            return 0;
        })
        const game = await matchService.gameEnd(roomName)
        clients.forEach(async (elem: any) => {
            io.emit(elem.clientId, { type: GAME_END, data: { clients, game: game } });

        })
        if(cronIds[roomName]){
            clearTimeout(cronIds[roomName])
            delete cronIds[roomName]
        }
        solitaire.removeGame(roomName, clients);
        return;
    }

    client.on(NEW_SOLITAIRE_GAME, handleNewSolitaireGame);
    client.on(JOIN_SOLITAIRE_GAME, handleJoinSolitaireGame);
    client.on(GAME_END, handleGameEnd);
    client.on(GET_STATE, handleGetState);

}
