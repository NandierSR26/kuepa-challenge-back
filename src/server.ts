import express from 'express';
import http from 'http';
import path from 'path';
import {Server as socketio} from 'socket.io';
import router from './routes/routes'
import cors from 'cors'
import { Sockets } from './sockets';
import { envs } from './config/envs';
import { connectDB } from './database/db';

export class Server {

  private app;
  private port;
  private server;
  private io;

  constructor() {

    this.app = express();
    this.port = envs.PORT;

    connectDB({
       dbName: envs.MONGO_DB_NAME,
       mongoUrl: envs.MONGO_URL
    }).then(() => console.log('DB connected'));


    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = new socketio( this.server );
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(__dirname + '/public'));

    // TODO: cors
    this.app.use(cors())

    // parseo del body
    this.app.use(express.json());

    // API endpoints
    this.app.use( router );

    this.app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });
  }


  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {

    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }

}