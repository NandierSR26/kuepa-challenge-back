import { Server } from 'socket.io'
import { validateToken } from './config/jwt.adapter';
import { connectUser, getOnlineUsers } from './controllers/users.controller';
import { recordMessage } from './controllers/chat.controller';
import { Document } from 'mongoose';

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
            socket.join('group')

            this.io.emit('list-users', await getOnlineUsers());

            socket.on('message-to-group', async(payload) => {
                const message = await recordMessage( payload );

                this.io.to('group').emit('message-to-group', message);
            })


        });
    }


}


