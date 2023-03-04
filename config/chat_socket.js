
module.exports.chatSockets = function(socketServer){
    let io = require("socket.io")(socketServer, {
      cors: {
        origin:'*',
        methods: ["GET", "POST"],
      },
    });


    io.sockets.on('connection', function (socket) {
        console.log("New connection received "+ socket.id);
    })
}