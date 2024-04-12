"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const sockets_1 = require("./sockets");
const envs_1 = require("./config/envs");
const db_1 = require("./database/db");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = envs_1.envs.PORT;
        (0, db_1.connectDB)({
            dbName: envs_1.envs.MONGO_DB_NAME,
            mongoUrl: envs_1.envs.MONGO_URL
        }).then(() => console.log('DB connected'));
        // Http server
        this.server = http_1.default.createServer(this.app);
        // Configuraciones de sockets
        this.io = new socket_io_1.Server(this.server);
    }
    middlewares() {
        // Desplegar el directorio público
        this.app.use(express_1.default.static(__dirname + '/public'));
        // TODO: cors
        this.app.use((0, cors_1.default)());
        // parseo del body
        this.app.use(express_1.default.json());
        // API endpoints
        this.app.use(routes_1.default);
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, 'public', 'index.html'));
        });
    }
    configurarSockets() {
        new sockets_1.Sockets(this.io);
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
exports.Server = Server;
