import http = require('http');
const socketio = require('socket.io');
const solitaireHandler = require("../socket/solitaireHandler");

export default ({ app }: { app: any }) => {
    
    const io = socketio(app, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      });
    // Run when client connects
    
    io.on('connection', (socket:any) => {
        
        console.log('conn ',socket.id)  
        solitaireHandler(io, socket);

        // Runs when client disconnects
        socket.on('disconnect', () => {
           console.log('disco ',socket.id)
        });
    });



}