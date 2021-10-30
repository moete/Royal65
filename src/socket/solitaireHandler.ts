import Solitaire from "../games/solitaire";


function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const solitaire = new Solitaire();

module.exports = (io: any, client: any) => {

    const handleNewSolitaireGame = (payload: any) => {
        let roomName = makeid(5);
        solitaire.newGame(client.id, roomName)
        client.join(roomName)
        client.emit("code", roomName)

    }
    const handleGameEnd = (payload: any) => {
        const state=solitaire.getState(payload.roomName)
        console.log(solitaire.getStates(),state)
        if(!state.playerOne)
            state.playerOne=payload
        else{
            state.playerTwo=payload
            state.finish=true
            console.log("GAME END ",solitaire.getState(payload.roomName))
              }
        solitaire.setState(payload.roomName,state)

    }
    const handleGetState = (payload: any) => {
        const room=solitaire.getState(payload.roomName)
        console.log(payload.roomName,room=== undefined)
        if(room === undefined){
            io.to(payload.socketId).emit("initState",null);
            return;
        }
        const state=room.state
        if(!state.finish)
            io.to(payload.socketId).emit("initState",state);
        else
            io.to(payload.socketId).emit("initState",null);

    }
    const handleJoinSolitaireGame = (roomName: any) => {
        const room = io.sockets.adapter.rooms.get(roomName);
        if(room=== undefined){
            client.emit('unknownCode');
            return
        }
        let numClients = room.size;

        if (numClients === 0) {
            client.emit('unknownCode');
            return;
        } else if (numClients > 1) {
            client.emit('tooManyPlayers');
            return;
        }
        client.join(roomName)
        solitaire.joinGame(client.id, roomName)
        io.to(roomName).emit("startGame", roomName);

    }
    client.on('newSolitaireGame', handleNewSolitaireGame);
    client.on('joinSolitaireGame', handleJoinSolitaireGame);
    client.on('gameEnd', handleGameEnd);
    client.on('getState', handleGetState);

}
