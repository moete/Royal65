import http = require('http');
const socketio = require('socket.io');

export default ({ app }: { app: any }) => {
    
    const io = socketio(app);
    // Run when client connects
    
    io.on('connection', (socket:any) => {
        
        console.log('conn ',socket.id)

        // Runs when client disconnects
        socket.on('disconnect', () => {
           console.log('disco ',socket.id)
        });
    });



}