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
exports.validateAuth = exports.login = exports.Register = void 0;
const users_model_1 = require("../models/users.model");
const bcrypt_adapter_1 = require("../config/bcrypt.adapter");
const handleReponses_1 = require("../config/handleReponses");
const jwt_adapter_1 = require("../config/jwt.adapter");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.UserModel.create(req.body);
        user.password = bcrypt_adapter_1.bcryptAdapter.hash(req.body.password);
        user.online = false;
        yield user.save();
        const token = yield (0, jwt_adapter_1.generateToken)({ id: user.id });
        if (!token)
            return (0, handleReponses_1.handleError)({ code: 500, message: 'Error while creating JWT', res });
        return (0, handleReponses_1.handleSuccess)({ code: 200, message: 'User created', res, data: { user, token } });
    }
    catch (error) {
        return (0, handleReponses_1.handleError)({ code: 500, message: 'Something went wrong', res });
    }
});
exports.Register = Register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield users_model_1.UserModel.findOne({ username });
        if (!user)
            return (0, handleReponses_1.handleError)({ code: 404, message: 'This username not exist', res });
        const isMatch = bcrypt_adapter_1.bcryptAdapter.compare(password, user.password);
        if (!isMatch)
            return (0, handleReponses_1.handleError)({ code: 401, message: 'Wrong Credentials', res });
        const token = yield (0, jwt_adapter_1.generateToken)({ id: user.id });
        if (!token)
            return (0, handleReponses_1.handleError)({ code: 500, message: 'Error while creating JWT', res });
        return (0, handleReponses_1.handleSuccess)({ code: 200, message: 'Authenticated successfully', res, data: { user, token } });
    }
    catch (error) {
        return (0, handleReponses_1.handleError)({ code: 500, message: 'Something went wrong', res });
    }
});
exports.login = login;
const validateAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    const payload = yield (0, jwt_adapter_1.validateToken)(token);
    if (!payload)
        return (0, handleReponses_1.handleError)({ code: 401, message: 'User is not authenticated', res });
    const user = yield users_model_1.UserModel.findById(payload.id);
    if (user)
        return (0, handleReponses_1.handleSuccess)({ code: 200, message: 'Is authenticated', res, data: { user, token } });
    return (0, handleReponses_1.handleError)({ code: 401, message: 'User is not authenticated', res });
});
exports.validateAuth = validateAuth;
