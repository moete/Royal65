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
    const handleJoinSolitaireGame = (roomName: any) => {
        const room = io.sockets.adapter.rooms.get(roomName);
        
        let numClients = room.size;

        if (numClients === 0) {
            client.emit('unknownCode');
            return;
        } else if (numClients > 1) {
            client.emit('tooManyPlayers');
            return;
        }
        client.join(roomName)
        const state = solitaire.joinGame(client.id, roomName)
        io.to(roomName).emit("state", state);

    }
    client.on('newSolitaireGame', handleNewSolitaireGame);
    client.on('joinSolitaireGame', handleJoinSolitaireGame);

}
