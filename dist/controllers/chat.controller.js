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
exports.recordMessage = exports.getGroupChat = exports.getIndividualChat = void 0;
const chat_model_1 = require("../models/chat.model");
const handleReponses_1 = require("../config/handleReponses");
const types_1 = require("../types");
const getIndividualChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const meID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const from = req.params.id;
    try {
        const messages = yield chat_model_1.ChatModel.find({
            $or: [
                { from: meID, to: from },
                { from: from, to: meID }
            ]
        }).sort({ createdAt: 'asc' });
        return (0, handleReponses_1.handleSuccess)({ code: 200, message: 'Chat loaded', res, data: messages });
    }
    catch (error) {
        return (0, handleReponses_1.handleError)({ code: 500, message: 'Something went wrong', res });
    }
});
exports.getIndividualChat = getIndividualChat;
const getGroupChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chat_model_1.ChatModel.find({
            destination_type: types_1.destinationTypes.GROUP
        })
            .populate('from')
            .sort({ createAt: 'asc' });
        return (0, handleReponses_1.handleSuccess)({ code: 200, message: 'Chat loaded', res, data: chat });
    }
    catch (error) {
        return (0, handleReponses_1.handleError)({ code: 500, message: 'Something went wrong', res });
    }
});
exports.getGroupChat = getGroupChat;
const recordMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mensaje = new chat_model_1.ChatModel(payload);
        yield mensaje.save();
        return mensaje;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.recordMessage = recordMessage;
