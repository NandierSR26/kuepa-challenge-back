"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sockets = void 0;
const jwt_adapter_1 = require("./config/jwt.adapter");
const users_controller_1 = require("./controllers/users.controller");
const chat_controller_1 = require("./controllers/chat.controller");
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
            const payload = yield (0, jwt_adapter_1.validateToken)(socket.handshake.query['token']);
            // console.log({payload})
            if (!payload) {
                console.log('Invalid socket');
                return socket.disconnect();
            }
            yield (0, users_controller_1.connectUser)(payload.id);
            socket.join(payload.id);
            socket.join('group');
            this.io.emit('list-users', yield (0, users_controller_1.getOnlineUsers)());
            socket.on('message-to-group', (payload) => __awaiter(this, void 0, void 0, function* () {
                const message = yield (0, chat_controller_1.recordMessage)(payload);
                this.io.to('group').emit('message-to-group', message);
            }));
        }));
    }
}
exports.Sockets = Sockets;
