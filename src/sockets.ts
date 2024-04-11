import { Server } from 'socket.io'
import { validateToken } from './config/jwt.adapter';
import { connectUser } from './controllers/users.controller';

export  class Sockets {

    private io;

    constructor(io: Server) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            const payload = await validateToken( socket.handshake.query['token'] as string )
            // console.log({payload})

            if( !payload ) {
                console.log('Invalid socket');
                return socket.disconnect();
            }

            await connectUser(payload.id);

            socket.join( payload.id );


        });
    }


}


