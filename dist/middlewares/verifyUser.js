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
exports.validateUsername = void 0;
const users_model_1 = require("../models/users.model");
const handleReponses_1 = require("../config/handleReponses");
const validateUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.UserModel.findOne({ username: req.body.username });
        if (user)
            return (0, handleReponses_1.handleError)({ code: 401, message: 'This username already exist', res });
        next();
    }
    catch (error) {
        return (0, handleReponses_1.handleError)({ code: 500, message: 'Something went wrong', res });
    }
});
exports.validateUsername = validateUsername;
