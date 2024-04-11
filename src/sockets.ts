import { Server } from 'socket.io'

export  class Sockets {

    private io;

    constructor(io: Server) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            console.log('socket.io connected')
        });
    }


}


