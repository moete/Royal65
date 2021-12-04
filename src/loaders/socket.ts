const socketio = require('socket.io');
const solitaireHandler = require("../socket/solitaireHandler");

export default ({ app }: { app: any }) => {

  const io = socketio(app, {
    path: '/solitaireSocket',
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  // Run when client connects

  io.on('connection', (socket: any) => {

    console.log('conn ', socket.id)
    solitaireHandler(io, socket);

    // Runs when client disconnects
    socket.on('disconnect', () => {
      console.log('disco ', socket.id)
    });
  });


  io.on("connect_error", (err:any) => {
    console.log(`connect_error due to ${err.message}`);
  });

  return io;


}