"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = exports.ChatSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const users_model_1 = require("./users.model");
exports.ChatSchema = new mongoose_1.Schema({
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
        validate: {
            validator: function (value) {
                // Verificar si es un array y si todos los elementos son ObjectIds
                if (!Array.isArray(value)) {
                    return mongoose_1.default.Types.ObjectId.isValid(value);
                }
                return value.every((v) => {
                    return mongoose_1.default.Types.ObjectId.isValid(v);
                });
            },
            message: (props) => `${props.value} no es un array válido de ObjectIds`
        }
    },
    text: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    destination_type: {
        type: String,
        required: true,
        enum: ["USER", "GROUP"]
    }
}, {
    timestamps: true
});
exports.ChatSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.ChatModel = mongoose_1.default.model('Chat', exports.ChatSchema);
const UserModel = mongoose_1.default.model('User', users_model_1.UsersSchema);
