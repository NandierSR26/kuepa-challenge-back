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
exports.validateJWT = void 0;
const handleReponses_1 = require("../config/handleReponses");
const users_model_1 = require("../models/users.model");
const jwt_adapter_1 = require("../config/jwt.adapter");
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.header('Authorization');
    if (!authorization)
        return (0, handleReponses_1.handleError)({ code: 401, message: 'No token provided', res });
    if (!authorization.startsWith('Bearer '))
        return (0, handleReponses_1.handleError)({ code: 401, message: 'Invalid Bearer token', res });
    const token = authorization.split(' ').at(1) || '';
    try {
        const payload = yield (0, jwt_adapter_1.validateToken)(token);
        if (!payload)
            return (0, handleReponses_1.handleError)({ code: 401, message: 'Invalid token', res });
        const user = yield users_model_1.UserModel.findById(payload.id);
        if (!user)
            return (0, handleReponses_1.handleError)({ code: 401, message: 'Invalid token - user', res });
        req.body.user = user;
        req.user = user;
        next();
    }
    catch (error) {
        return (0, handleReponses_1.handleError)({ code: 500, message: 'Something went wrong', res });
    }
});
exports.validateJWT = validateJWT;
