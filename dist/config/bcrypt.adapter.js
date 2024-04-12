"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptAdapter = void 0;
const bcrypt_1 = require("bcrypt");
exports.bcryptAdapter = {
    hash: (password) => {
        const salt = (0, bcrypt_1.genSaltSync)();
        return (0, bcrypt_1.hashSync)(password, salt);
    },
    compare: (password, hashed) => {
        return (0, bcrypt_1.compareSync)(password, hashed);
    }
};
